/**
 * Author: Ayush Jaiswal
 */

$(function() {

	$("#SearchByWeather").on('click', function() {
		$("#HomeDiv").hide();
		$("#SearchByPriorityDiv").hide();
		$("#SearchByWeatherDiv").show();
		$("#SearchByRestaurantDiv").hide();
		$("#SearchByCrimeDiv").hide();
		$("#SearchByLocationDiv").hide();
		$("#AboutDiv").hide();
		$("#MapDiv").hide(); 
	});


	$("#SearchByWeatherBtn").click(function(e) {


		if($('#RainDropDown option:selected').val()=="none"){
			$("#SearchByWeatherDiv").show();
			$('#selectWeatherRequiredLbl').text("Rainfall level is required!");

		}else if($('#AvgTempDropDown option:selected').val()=="none"){
			$("#SearchByWeatherDiv").show();
			$('#selectWeatherRequiredLbl').text("Avg. Temp level is required!");

		}else if($('#HumidtyDropDown option:selected').val()=="none"){
			$("#SearchByWeatherDiv").show();
			$('#selectWeatherRequiredLbl').text("Humidity level is required!");
		}

		if($('#RainDropDown option:selected').val()!="none" && $('#AvgTempDropDown option:selected').val()!="none" && $('#HumidtyDropDown option:selected').val()!="none"){
			loadSearchByWeatherData();
		}
	});

	function loadSearchByWeatherData()
	{
		var rainDrop = $('#RainDropDown option:selected').val();
		var avgTemp = $('#AvgTempDropDown option:selected').val();
		var humidty = $('#HumidtyDropDown option:selected').val();

		var dataString=""+rainDrop+"-"+avgTemp+"-"+humidty;
		$.ajax({
			type : "GET",
			url : "rest/UnivSuggest/weather/"+dataString,
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


		//alert("rainDrop"+rainDrop+"avgTemp"+avgTemp+"humidty"+humidty);
	}

	$("#RainDropDown").change(function() {
		if($("#RainDropDown").val() != "none"){

			$('#selectWeatherRequiredLbl').empty();
		} 
	});

	$("#AvgTempDropDown").change(function() {
		if($("#AvgTempDropDown").val() != "none"){

			$('#selectWeatherRequiredLbl').empty();
		} 
	});

	$("#HumidtyDropDown").change(function() {
		if($("#HumidtyDropDown").val() != "none"){

			$('#selectWeatherRequiredLbl').empty();
		} 
	});


})