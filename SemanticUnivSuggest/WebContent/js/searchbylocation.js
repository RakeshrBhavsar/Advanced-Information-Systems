/**
 * Author: Ayush Jaiswal
 */

$(function() {
	$("#SearchByLocation").on('click', function() {
		$("#HomeDiv").hide();
		$("#SearchByPriorityDiv").hide();
		$("#SearchByWeatherDiv").hide();
		$("#SearchByRestaurantDiv").hide();
		$("#SearchByCrimeDiv").hide();
		$("#SearchByLocationDiv").show();
		$("#AboutDiv").hide();
		$("#MapDiv").hide(); 

	});


	$("#SearchByLocationBtn").click(function(e) {

		if($('#LocationStateDropDown option:selected').val()=="none"){
			$("#SearchByLocationDiv").show();
			$('#selectLocationRequiredLbl').text("State value is required!");

		}else if($('#LocationCityDropDown option:selected').val()=="none"){
			$("#SearchByLocationDiv").show();
			$('#selectLocationRequiredLbl').text("City value is required!");
		}else if($('#LocationStateDropDown option:selected').val()!="none" && $('#LocationCityDropDown option:selected').val()!="none"){
			loadSearchByLocationData(); 
		}
	});

	function loadSearchByLocationData()
	{
		var stateData= $('#LocationStateDropDown option:selected').val();
		var cityData= $('#LocationCityDropDown option:selected').val();

		var dataStrng= ""+stateData+"-"+cityData;

		//	alert("in datastring value :"+dataString.weatherPriority);

		$.ajax({
			type : "GET",
			url : "rest/UnivSuggest/location/"+dataStrng,
			dataType : 'json',
			cache : false,
			success : function(data, textStatus, xhr) {
				//console.log(data);
				$.each(data,function(key,object){
					if(key=="results"){
						$.each(object,function(key2,object2){
							$.each(object2,function(index,value){
								$.each(value,function(i,val){
									console.log(val.value);
								});
							});
						});
					}
				});


				//displayResult(responseData);
			},
			error : function(data, textStatus, errorThrown) {
				console.log(textStatus)
				alert("One or more fields has been entered incorrectly.");
			}
		});
	}

//	For updating the options in city based on state selected

	$("#LocationStateDropDown").change(function() {
		if($("#LocationStateDropDown").val() == "AZ"){

			var select = $('#LocationCityDropDown');
			var cityList = {
					'none' : 'Select City',
					'Phoenix' : 'Phoenix',
					'Avondale' : 'Avondale',
			};

			$('option', select).remove();

			$.each(cityList, function(text, key) {
				var option = new Option(key, text);
				select.append($(option));
			});
		} 
	});
	$("#LocationStateDropDown").change(function() {
		if($("#LocationStateDropDown").val() == "CA"){

			var select = $('#LocationCityDropDown');
			var cityList = {
					'none' : 'Select City',
					'Irvine' : 'Irvine',
					'San Diego' : 'San Diego',
					'Berkeley' : 'Berkeley',
					'Beverly Hills' : 'Beverly Hills',
			};

			$('option', select).remove();

			$.each(cityList, function(text, key) {
				var option = new Option(key, text);
				select.append($(option));
			});
		} 
	});

	$("#LocationStateDropDown").change(function() {
		if($("#LocationStateDropDown").val() == "FL"){

			var select = $('#LocationCityDropDown');
			var cityList = {
					'none' : 'Select City',
					'Miami' : 'Miami',
					'Tampa' : 'Tampa',
			};

			$('option', select).remove();

			$.each(cityList, function(text, key) {
				var option = new Option(key, text);
				select.append($(option));
			});
		} 
	});

	$("#LocationStateDropDown").change(function() {
		if($("#LocationStateDropDown").val() == "GA"){

			var select = $('#LocationCityDropDown');
			var cityList = {
					'none' : 'Select City',
					'Athens' : 'Athens',
					'Atlanta' : 'Atlanta',
			};

			$('option', select).remove();

			$.each(cityList, function(text, key) {
				var option = new Option(key, text);
				select.append($(option));
			});
		} 
	});

	$("#LocationStateDropDown").change(function() {
		if($("#LocationStateDropDown").val() == "NY"){

			var select = $('#LocationCityDropDown');
			var cityList = {
					'none' : 'Select City',
					'New York City' : 'New York City',
			};

			$('option', select).remove();

			$.each(cityList, function(text, key) {
				var option = new Option(key, text);
				select.append($(option));
			});
		} 
	});

	$("#LocationStateDropDown").change(function() {
		if($("#LocationStateDropDown").val() == "OR"){

			var select = $('#LocationCityDropDown');
			var cityList = {
					'none' : 'Select City',
					'Wilsonville' : 'Wilsonville',
					'Tigard' : 'Tigard',
					'Portland' : 'Portland',
			};

			$('option', select).remove();

			$.each(cityList, function(text, key) {
				var option = new Option(key, text);
				select.append($(option));
			});
		} 
	});

	$("#LocationStateDropDown").change(function() {
		if($("#LocationStateDropDown").val() == "TX"){

			var select = $('#LocationCityDropDown');
			var cityList = {
					'none' : 'Select City',
					'San Antonio' : 'San Antonio',
					'Dallas' : 'Dallas',
			};

			$('option', select).remove();

			$.each(cityList, function(text, key) {
				var option = new Option(key, text);
				select.append($(option));
			});
		} 
	});

	$("#LocationStateDropDown").change(function() {
		if($("#LocationStateDropDown").val() == "WA"){

			var select = $('#LocationCityDropDown');
			var cityList = {
					'none' : 'Select City',
					'Auburn' : 'Auburn',
					'Bellingham' : 'Bellingham',
			};

			$('option', select).remove();

			$.each(cityList, function(text, key) {
				var option = new Option(key, text);
				select.append($(option));
			});
		} 
	});



	$("#LocationStateDropDown").change(function() {
		if($("#LocationStateDropDown").val() != "none"){

			$('#selectLocationRequiredLbl').empty();
		} 
	});

	$("#LocationCityDropDown").change(function() {
		if($("#LocationCityDropDown").val() != "none"){

			$('#selectLocationRequiredLbl').empty();
		} 
	});

})