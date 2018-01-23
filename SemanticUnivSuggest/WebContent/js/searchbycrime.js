/**
 * Author: Ayush Jaiswal
 */

$(function() {
	$("#SearchByCrime").on('click', function() {
		$("#HomeDiv").hide();
		$("#SearchByPriorityDiv").hide();
		$("#SearchByWeatherDiv").hide();
		$("#SearchByRestaurantDiv").hide();
		$("#SearchByCrimeDiv").show();
		$("#SearchByLocationDiv").hide();
		$("#AboutDiv").hide
		$("#MapDiv").hide();

	});


	$("#SearchByCrimeBtn").click(function(e) {
		if($('#CrimeTotalReportsDropDown option:selected').val()=="none"){
			$("#SearchByCrimeDiv").show();
			$('#selectCrimeRequiredLbl').text("Total Crime Reports value is required!");

		}else if($('#OnCampusCrimeDropDown option:selected').val()=="none"){
			$("#SearchByCrimeDiv").show();
			$('#selectCrimeRequiredLbl').text("On Campus Crime value is required!");

		}else if($('#PublicPropertyCrimeDropDown option:selected').val()=="none"){
			$("#SearchByCrimeDiv").show();
			$('#selectCrimeRequiredLbl').text("Restaurant Priority is required!");
		}

		if($('#CrimeTotalReportsDropDown option:selected').val()!="none" && $('#OnCampusCrimeDropDown option:selected').val()!="none" && $('#PublicPropertyCrimeDropDown option:selected').val()!="none"){
			loadSearchByCrimeData(); 
		}

	});
	function loadSearchByCrimeData(){

		var totalReport = $('#CrimeTotalReportsDropDown option:selected').val();
		var onCampus = $('#OnCampusCrimeDropDown option:selected').val();
		var publicProperty = $('#PublicPropertyCrimeDropDown option:selected').val();
		
		var dataString=""+totalReport+"-"+onCampus+"-"+publicProperty;
		
		$.ajax({
			type : "GET",
			url : "rest/UnivSuggest/crime/"+dataString,
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

//		alert("totalReport"+totalReport+"onCampus"+onCampus+"publicProperty"+publicProperty);
	}

	$("#CrimeTotalReportsDropDown").change(function() {
		if($("#CrimeTotalReportsDropDown").val() != "none"){

			$('#selectCrimeRequiredLbl').empty();
		} 
	});

	$("#OnCampusCrimeDropDown").change(function() {
		if($("#OnCampusCrimeDropDown").val() != "none"){

			$('#selectCrimeRequiredLbl').empty();
		} 
	});

	$("#PublicPropertyCrimeDropDown").change(function() {
		if($("#PublicPropertyCrimeDropDown").val() != "none"){

			$('#selectCrimeRequiredLbl').empty();
		} 
	});

})
