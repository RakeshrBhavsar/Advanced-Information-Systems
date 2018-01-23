/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {

	$("#About").click(function(e) {
		$("#HomeDiv").hide();
		$("#SearchByPriorityDiv").hide();
		$("#SearchByWeatherDiv").hide();
		$("#SearchByRestaurantDiv").hide();
		$("#SearchByCrimeDiv").hide();
		$("#SearchByLocationDiv").hide();
		$("#AboutDiv").show();
	});
});