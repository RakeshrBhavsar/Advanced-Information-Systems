/**
 * Author: Ayush Jaiswal
 */

$(document).ready(

		function() {

			$("#SearchByPriority").click(function(e) {
				$("#HomeDiv").hide();
				$("#SearchByPriorityDiv").show();
				$("#SearchByWeatherDiv").hide();
				$("#SearchByRestaurantDiv").hide();
				$("#SearchByLocationDiv").hide();
				$("#AboutDiv").hide();
				$("#MapDiv").hide();

			});

			//When the search by priority button is clicked.
			$("#SearchByPriorityBtn").click(function(e) {


				if($('#WeatherDropDown option:selected').val()=="none"){
					$("#SearchByPriorityDiv").show();
					$('#selectRequiredLbl').text("Weather Priority is required!");

				}else if($('#CrimeDropDown option:selected').val()=="none"){
					$("#SearchByPriorityDiv").show();
					$('#selectRequiredLbl').text("Crime Priority is required!");

				}else if($('#RestaurantDropDown option:selected').val()=="none"){
					$("#SearchByPriorityDiv").show();
					$('#selectRequiredLbl').text("Restaurant Priority is required!");
				}

				if($('#WeatherDropDown option:selected').val()!="none" && $('#CrimeDropDown option:selected').val()!="none" && $('#RestaurantDropDown option:selected').val()!="none"){
					loadSearchByPriorityData();	
				}
			});


			function loadSearchByPriorityData() {
				dataString = $("#SearchByPriorityForm").serialize();

				var weatherPriority = $('#WeatherDropDown option:selected').val();
				var crimePriority = $('#CrimeDropDown option:selected').val();
				var restaurantPriority = $('#RestaurantDropDown option:selected').val();
				var state = $('#StateDropDownPriority option:selected').val();

//				dataString = {
//				weatherPriority : weatherPriority,
//				crimePriority : crimePriority,
//				restaurantPriority : restaurantPriority,
//				state : state
//				};

				var dataStrng= ""+weatherPriority+"-"+crimePriority+"-"+restaurantPriority+"-"+state;

				//	alert("in datastring value :"+dataString.weatherPriority);



				$.ajax({
					type : "GET",
					url : "rest/UnivSuggest/overall/"+dataStrng,
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
			function displayResult(responseData) {

				//alert(responseData.cname.value);
				var address=responseData.staddr.value;
				var add=responseData.cname.value;
				initMap(address+add);
			}

			function initMap(addressq) {


				var uluru = {lat: 33.923696,lng: -83.3836487};
				var map = new google.maps.Map(document.getElementById('MapDiv'), {
					zoom: 15,
					center: uluru
				});

				var contentString = '<div id="content">'+
				'This is test content'+
				'</div>';
				var infowindow = new google.maps.InfoWindow({
					content: contentString
				});

				var marker = new google.maps.Marker({
					position: uluru,
					map: map,
					title: 'Uluru (Ayers Rock)'
				});

				marker.addListener('click', function() {
					infowindow.open(map, marker);
				});

				$("#HomeDiv").hide();
				$("#SearchByPriorityDiv").hide();
				$("#SearchByWeatherDiv").hide();
				$("#SearchByRestaurantDiv").hide();
				$("#SearchByLocationDiv").hide();
				$("#AboutDiv").hide();
				$("#MapDiv").show();

			}

			$("#WeatherDropDown").change(function() {
				if($("#WeatherDropDown").val() != "none"){

					$('#selectRequiredLbl').empty();
				} 
			});

			$("#RestaurantDropDown").change(function() {
				if($("#RestaurantDropDown").val() != "none"){

					$('#selectRequiredLbl').empty();
				} 
			});

			$("#CrimeDropDown").change(function() {
				if($("#CrimeDropDown").val() != "none"){

					$('#selectRequiredLbl').empty();
				} 
			});

		});
