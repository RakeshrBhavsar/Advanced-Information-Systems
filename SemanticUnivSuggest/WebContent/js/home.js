/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
	
	$("#Home").click(function(e) {
		$("#HomeDiv").show();
		$("#SearchByPriorityDiv").hide();
		$("#SearchByWeatherDiv").hide();
		$("#SearchByRestaurantDiv").hide();
		$("#SearchByCrimeDiv").hide();
		$("#SearchByLocationDiv").hide();
		$("#AboutDiv").hide();
		$("#MapDiv").hide();

	});
	
	$("#StartSearchBt").click(function(e) {
		$("#HomeDiv").hide();
		$("#SearchByPriorityDiv").show();
		$("#SearchByWeatherDiv").hide();
		$("#SearchByRestaurantDiv").hide();
		$("#SearchByCrimeDiv").hide();
		$("#SearchByLocationDiv").hide();
		$("#AboutDiv").hide();
		$("#MapDiv").hide();

	});
	
	$("#StartSearchBt2").click(function(e) {
		$("#HomeDiv").hide();
		$("#SearchByPriorityDiv").show();
		$("#SearchByWeatherDiv").hide();
		$("#SearchByRestaurantDiv").hide();
		$("#SearchByCrimeDiv").hide();
		$("#SearchByLocationDiv").hide();
		$("#AboutDiv").hide();
		$("#MapDiv").hide();
	});
	
});
