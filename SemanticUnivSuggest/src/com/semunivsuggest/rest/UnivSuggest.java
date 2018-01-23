package com.semunivsuggest.rest;

import java.io.ByteArrayOutputStream;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.hp.hpl.jena.query.Query;
import com.hp.hpl.jena.query.QueryExecutionFactory;
import com.hp.hpl.jena.query.QueryFactory;
import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.query.ResultSetFormatter;
import com.hp.hpl.jena.query.Syntax;
import com.hp.hpl.jena.sparql.engine.http.QueryEngineHTTP;

@Path("/UnivSuggest") 
public class UnivSuggest {

	static String endpoint = "http://localhost:8890/sparql";
	static String queryString = "Prefix rdfs: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"+
			"Prefix kys: <http://www.knowYourSchool.org/ontology/SchoolBio#>"
			+ "Prefix xsd: <http://www.w3.org/2001/XMLSchema#>";

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/overall/{dataStrng}")
	public Response overallResults (@PathParam("dataStrng")String dataString)
	{
		ResultSet resultSet=null;

		String [] requestData=dataString.split("-");

		String weatherPriority = requestData[0];
		String crimePriority = requestData[1];
		String restaurantPriority = requestData[2];
		String state = requestData[3];

		queryString +="Select DISTINCT ?name ?phone ?web ?zip " +
				"WHERE {" +
				" ?s a kys:University ." +	
				" ?s kys:hasName ?name ." +
				" ?s kys:hasPlace ?city ." +
				" ?city kys:hasName ?cname ." +
				" ?s kys:hasContact ?contact ." +
				" ?contact kys:hasWebsite ?web." +
				" ?contact kys:hasPhone ?phone ."
				+ "?contact a kys:Contact ."
				+ "?s kys:hasAddress ?addr ."
				+ "?addr a kys:InstAddress ."
				+ "?addr kys:hasStateCode ?scode ."
				+ "?addr kys:hasZip ?zip ."
				+ " FILTER(regex(?scode,\""+state+"\",\"i\"))" +
				"} LIMIT 100";


		Query query = QueryFactory.create(queryString, Syntax.syntaxARQ);
		QueryEngineHTTP qe = (QueryEngineHTTP) QueryExecutionFactory.sparqlService(endpoint, query);
		String json = "";
		try {
			resultSet = qe.execSelect();
			ByteArrayOutputStream b = new ByteArrayOutputStream();
			ResultSetFormatter.outputAsJSON(b, resultSet);
			json = b.toString();
			System.out.println(json);

		} catch (Exception e) {
			e.printStackTrace();
		}
		qe.close();

		queryString="Prefix rdfs: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"+
				"Prefix kys: <http://www.knowYourSchool.org/ontology/SchoolBio#>"
				+ "Prefix xsd: <http://www.w3.org/2001/XMLSchema#>";

		return Response.ok(json).build();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/weather/{dataStrng}")
	public Response weather (@PathParam("dataStrng")String dataString)
	{
		ResultSet resultSet=null;

		String [] requestData=dataString.split("-");

		String rain = requestData[0];
		String avgTemp = requestData[1];
		String humidity = requestData[2];

		String rainFilter="";
		String tempFilter="";
		String hmdFilter="";

		if(rain.equalsIgnoreCase("1"))
		{
			rainFilter="xsd:integer(?rain)<3";
		}
		else if(rain.equalsIgnoreCase("2"))
		{
			rainFilter="xsd:integer(?rain)<5";
		}
		else
		{
			rainFilter="xsd:integer(?rain)>=5";
		}

		queryString +="Select DISTINCT ?name ?phone ?web ?zip " +
				"WHERE {" +
				" ?s a kys:University ." +	
				" ?s kys:hasName ?name ." +
				" ?s kys:hasPlace ?city ." +
				" ?city kys:hasName ?cname ." +
				" ?s kys:hasContact ?contact ." +
				" ?contact kys:hasWebsite ?web." +
				" ?contact kys:hasPhone ?phone ."
				+ "?contact a kys:Contact ."
				+ "?city kys:hasWeather ?wthr ."
				+ "?wthr a kys:Weather ."
				+ "?wthr kys:hasRain ?rain ."
				+ "?wthr kys:hasHumidity ?humidity ."
				+ "?wthr kys:hasTemp ?temp ."
				+ "?temp a kys:Temperature ."
				+ "?temp kys:hasAvgTemp ?avgTemp ."				
				+ " FILTER("+rainFilter+")" +
				"} LIMIT 100";


		Query query = QueryFactory.create(queryString, Syntax.syntaxARQ);
		QueryEngineHTTP qe = (QueryEngineHTTP) QueryExecutionFactory.sparqlService(endpoint, query);
		String json = "";
		try {
			resultSet = qe.execSelect();
			ByteArrayOutputStream b = new ByteArrayOutputStream();
			ResultSetFormatter.outputAsJSON(b, resultSet);
			json = b.toString();
			System.out.println(json);

		} catch (Exception e) {
			e.printStackTrace();
		}
		qe.close();

		queryString="Prefix rdfs: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"+
				"Prefix kys: <http://www.knowYourSchool.org/ontology/SchoolBio#>"
				+ "Prefix xsd: <http://www.w3.org/2001/XMLSchema#>";

		return Response.ok(json).build();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/restaurant/{dataStrng}")
	public Response restaurant (@PathParam("dataStrng")String dataString)
	{
		ResultSet resultSet=null;

		String [] requestData=dataString.split("-");

		String price = requestData[0];
		String city = requestData[1];

		String priceFilter="";

		if(price.equalsIgnoreCase("1"))
		{
			priceFilter="xsd:integer(?pricing)=1";
		}
		else if(price.equalsIgnoreCase("2"))
		{
			priceFilter="xsd:integer(?pricing)=2";
		}
		else
		{
			priceFilter="xsd:integer(?pricing)=3";
		}

		queryString +="Select DISTINCT ?name ?raddr ?rname ?rating " +
				"WHERE {" +
				" ?s a kys:University ." +	
				" ?s kys:hasName ?name ." +
				" ?s kys:hasPlace ?city ." +
				" ?city kys:hasName ?cname ." +
				" ?s kys:hasAddress ?addr ." +
				" ?addr a kys:InstAddress ." +
				" ?resto a kys:Restaurant ."
				+ " ?resto kys:hasAddress ?raddr ."
				+ " ?resto kys:hasName ?rname ."				
				+ " ?resto kys:hasAddress ?raddr ."
				+ "?resto kys:hasName ?rname ."
				+ " ?resto kys:hasRating ?rating ."
				+ "?resto kys:hasPriceRange ?pricing ."
				+ "FILTER(regex(?raddr, ?cname, \"i\") && "+priceFilter+" && regex(?raddr,\""+city+"\", \"i\")) }"
				//+"Order By (?name) "
				+"LIMIT 100";


		Query query = QueryFactory.create(queryString, Syntax.syntaxARQ);
		QueryEngineHTTP qe = (QueryEngineHTTP) QueryExecutionFactory.sparqlService(endpoint, query);
		String json = "";
		try {
			resultSet = qe.execSelect();
			ByteArrayOutputStream b = new ByteArrayOutputStream();
			ResultSetFormatter.outputAsJSON(b, resultSet);
			json = b.toString();
			System.out.println(json);

		} catch (Exception e) {
			e.printStackTrace();
		}
		qe.close();

		queryString="Prefix rdfs: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"+
				"Prefix kys: <http://www.knowYourSchool.org/ontology/SchoolBio#>"
				+ "Prefix xsd: <http://www.w3.org/2001/XMLSchema#>";

		return Response.ok(json).build();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/crime/{dataStrng}")
	public Response crime (@PathParam("dataStrng")String dataString)
	{
		ResultSet resultSet=null;

		String [] requestData=dataString.split("-");

		String totalreports = requestData[0];
		String oncampuscrime = requestData[1];
		String publicpropcrime = requestData[1];

		String totalFilter=" ?totalreports ?oncampuscrime ?publicpropcrime";
		String campusFilter="";
		String ppFilter="";

		if(totalreports.equalsIgnoreCase("1"))
		{
			totalFilter="xsd:integer(?totalreports)<10";
		}
		else if(totalreports.equalsIgnoreCase("2"))
		{
			totalFilter="xsd:integer(?totalreports)<20";
		}
		else
		{
			totalFilter="xsd:integer(?totalreports)<40";
		}

		queryString +="Select DISTINCT ?name ?cname ?totalreports ?oncampuscrime ?publicpropcrime " +
				"WHERE {" +
				" ?s a kys:University ." +	
				" ?s kys:hasName ?name ." +
				" ?s kys:hasPlace ?city ." +
				" ?city kys:hasName ?cname ." +
				" ?s kys:hasBranch ?branch ." +
				" ?branch kys:hasOnCampusCrime ?oncampuscrime ." +
				" ?branch kys:hasCrimeReports ?totalreports ."
				+ " ?branch kys:hasPublic_PropCrime ?publicpropcrime ."
				+ "FILTER("+totalFilter+" && xsd:integer(?totalreports) <10 && xsd:integer(?publicpropcrime) <10) }"
				//+"Order By (?name) "
				+"LIMIT 100";

		Query query = QueryFactory.create(queryString, Syntax.syntaxARQ);
		QueryEngineHTTP qe = (QueryEngineHTTP) QueryExecutionFactory.sparqlService(endpoint, query);
		String json = "";
		try {
			resultSet = qe.execSelect();
			ByteArrayOutputStream b = new ByteArrayOutputStream();
			ResultSetFormatter.outputAsJSON(b, resultSet);
			json = b.toString();
			System.out.println(json);

		} catch (Exception e) {
			e.printStackTrace();
		}
		qe.close();

		queryString="Prefix rdfs: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"+
				"Prefix kys: <http://www.knowYourSchool.org/ontology/SchoolBio#>"
				+ "Prefix xsd: <http://www.w3.org/2001/XMLSchema#>";

		return Response.ok(json).build();
	}
	
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/location/{cityname}")
	public Response location (@PathParam("cityname")String dataString)
	{
		ResultSet resultSet=null;

		String [] requestData=dataString.split("-");

		String stateCode = requestData[0];
		String cityname = requestData[1];

		queryString +="Select DISTINCT ?name ?cname ?web ?phone ?zip " +
				"WHERE {" +
				" ?s a kys:University ." +	
				" ?s kys:hasName ?name ." +
				" ?s kys:hasPlace ?city ." +
				" ?city kys:hasName ?cname ." +
				" ?s kys:hasContact ?contact ." +
				" ?contact kys:hasWebsite ?web." +
				" ?contact kys:hasPhone ?phone ."
				+ "?contact a kys:Contact ."
				+ "?s kys:hasAddress ?addr ."
				+ "?addr a kys:InstAddress ."
				+ "?addr kys:hasStateCode ?scode ."
				+ "?addr kys:hasZip ?zip ."
				+ "FILTER(regex(?scode, \""+stateCode+"\", \"i\") && regex(?cname, \""+cityname+"\", \"i\"))}"
				//+"Order By (?name) "
				+"LIMIT 100";

		Query query = QueryFactory.create(queryString, Syntax.syntaxARQ);
		QueryEngineHTTP qe = (QueryEngineHTTP) QueryExecutionFactory.sparqlService(endpoint, query);
		String json = "";
		try {
			resultSet = qe.execSelect();
			ByteArrayOutputStream b = new ByteArrayOutputStream();
			ResultSetFormatter.outputAsJSON(b, resultSet);
			json = b.toString();
			System.out.println(json);

		} catch (Exception e) {
			e.printStackTrace();
		}
		qe.close();

		queryString="Prefix rdfs: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"+
				"Prefix kys: <http://www.knowYourSchool.org/ontology/SchoolBio#>"
				+ "Prefix xsd: <http://www.w3.org/2001/XMLSchema#>";

		return Response.ok(json).build();
	}
	


}
