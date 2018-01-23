/**
 * Author: Ayush Jaiswal
 */

$(function() {
	$("#SearchByRestaurant").on('click', function() {
		$("#HomeDiv").hide();
		$("#SearchByPriorityDiv").hide();
		$("#SearchByWeatherDiv").hide();
		$("#SearchByRestaurantDiv").show();
		$("#SearchByCrimeDiv").hide();
		$("#SearchByLocationDiv").hide();
		$("#AboutDiv").hide();
		$("#MapDiv").hide();

	});


	$("#SearchByRestaurantBtn").click(function(e) {
		if($('#PricingDropDown option:selected').val()=="none"){
			$("#SearchByRestaurantDiv").show();
			$('#selectRestaurantRequiredLbl').text("Restaurant pricing is required!");

		}else if($.trim($('#UniNameText').val())==""){
			$("#SearchByRestaurantDiv").show();
			$('#selectRestaurantRequiredLbl').text("University Name is required!");

		}else if($('#PricingDropDown option:selected').val()!="none" && $('#UniNameText').val()!=""){
			loadSearchByRestaurantData(); 
		}
	});

	function loadSearchByRestaurantData()
	{
		var price = $('#PricingDropDown option:selected').val();
		var uniName = $.trim($('#UniNameText').val());
		
		var dataString= ""+price+"-"+uniName;
		
		$.ajax({
			type : "GET",
			url : "rest/UnivSuggest/restaurant/"+dataString,
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

		//alert("price"+price+"uniName"+uniName);
	}



	$("#PricingDropDown").change(function() {
		if($("#PricingDropDown").val() != "none"){

			$('#selectRestaurantRequiredLbl').empty();
		} 
	});

	$("#UniNameText").change(function() {
		if($("#UniNameText").val() != ""){

			$('#selectRestaurantRequiredLbl').empty();
		} 
	});


})