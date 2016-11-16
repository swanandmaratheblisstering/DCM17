
/* Custom Webservices */

var webservice = require('webService');
var config = require('config');
var Alloy = require('alloy');
var Logging = require('Logging');

//Object to store Social API status reponse
var status = {};

//Endpoint configuration
var baseEndpoint = config.baseEndpoint + '/api/' + config.apiVersion;


/**
 *
 * get_sponsor API
 * @param {Function} callback
 */
exports.get_sponsor = function(callback) {
	var endpoint = baseEndpoint + '/get_sponsor?_format=json';
	var header_data = [];
	var param = "";
	Logging.printConsoleLogs('get_sponsor param : '+JSON.stringify(param));
	webservice.callWebServiceJSON('GET', endpoint, param, header_data, 'json', false, function(e) {
		Logging.printConsoleLogs('get_sponsor : '+JSON.stringify(e));
		callback(e);
	}, true);
};

/**
 *
 * get_sessions API
 * @param {Function} callback
 */
exports.get_sessions = function(_param, callback) {
	var endpoint = baseEndpoint + '/get_sessions?tid='+_param;
	var header_data = [];
	var param = "";
	Logging.printConsoleLogs('get_sessions param : '+JSON.stringify(param));
	webservice.callWebServiceJSON('GET', endpoint, param, header_data, 'json', false, function(e) {
		Logging.printConsoleLogs('get_sessions : '+JSON.stringify(e));
		callback(e);
	}, true);
};

/**
 *
 * get_volunteers API
 * @param {Function} callback
 */
exports.get_volunteers = function(callback) {
	var endpoint = baseEndpoint + '/volunteers?_format=json';
	var header_data = [];
	var param = "";
	Logging.printConsoleLogs('get_volunteers param : '+JSON.stringify(param));
	webservice.callWebServiceJSON('GET', endpoint, param, header_data, 'json', false, function(e) {
		Logging.printConsoleLogs('get_volunteers : '+JSON.stringify(e));
		callback(e);
	}, true);
};

/**
 *
 * get_attendees API
 * @param {Function} callback
 */
exports.get_attendees = function(callback) {
	var endpoint = baseEndpoint + '/attendees?_format=json';
	var header_data = [];
	var param = "";
	Logging.printConsoleLogs('get_attendees param : '+JSON.stringify(param));
	webservice.callWebServiceJSON('GET', endpoint, param, header_data, 'json', false, function(e) {
		Logging.printConsoleLogs('get_attendees : '+JSON.stringify(e));
		callback(e);
	}, true);
};



exports.set_password = function(_password, _deviceId, _language, callback) {
	var _cookie = Ti.App.Properties.getString("sessionName") + "=" + Ti.App.Properties.getString("sessionId");
	var endpoint = baseEndpoint + '/reset_password';
	var header_data = [{
		'name' : 'X-CSRF-Token',
		'data' : Ti.App.Properties.getString("csrfToken")
	}, {
		"name" : "Cookie",
		"data" : _cookie
	}];
	
	var param = {
		password : _password,
		user_id : Ti.App.Properties.getString("user_id", ''),
		'language' :_language,
		'device_id' :_deviceId,
	};
	Logging.printConsoleLogs('set_password param : '+JSON.stringify(param) +" : "+JSON.stringify(header_data));
	// var e ={
		// "success" :true,
		// "message" :"Error",
		// "first_time_app_login" : true,
	// };
	webservice.callWebServiceJSON('POST', endpoint, param, header_data, 'json', false, function(e) 
	{
		Logging.printConsoleLogs('set_password : '+JSON.stringify(e));
		//setTimeout(function(){
			callback(e);
		// },1000);
	}, true);
};


/**
 * Get tanks list API
 * @param {String} user_id
 * @param {String} _language
 * @param {Function} callback
 */
exports.get_tanks = function(user_id, _language, callback) {
	var _cookie = Ti.App.Properties.getString("sessionName") + "=" + Ti.App.Properties.getString("sessionId");
	var endpoint = baseEndpoint + '/get_tank_details';
	var header_data = [{
		'name' : 'X-CSRF-Token',
		'data' : Ti.App.Properties.getString("csrfToken")
	}, {
		"name" : "Cookie",
		"data" : _cookie
	}];
	var param = {
		'user_id' : user_id,
		'language' :_language
	};
	
	Logging.printConsoleLogs('get_tanks param : '+JSON.stringify(param)+" : "+JSON.stringify(header_data));
	webservice.callWebServiceJSON('POST', endpoint, param, header_data, 'json', false, function(e) {
		// var e = {
			// "success" : true,
			// "message" : {
				// "show_gas_tank_level_banner" : false,
				// "show_gas_tank_level_banner_text" : "One or more tanks need to be re-filled. Order Now!",
				// "tanks" : [{
					// "tank_id" : "123",
					// "tank_title" : "Zeta Tank 4",
					// "tank_address" : "Flexible Automation Division, Via Gustavo Baz No. 166, Col. San Jerónimo Tepetlacalco",
					// "tank_last_refill_timestamp" : "1476608400",
					// "tank_reading" : "50",
					// "gas_company_logo" : "http://dev.mynube.gs/sites/default/files/2016-10/logosample.jpg",
					// "mimimum_gas_refill" : "250",
					// "gas_price" : "10",
					// "show_alert" : true
				// }, {
					// "tank_id" : "121",
					// "tank_title" : "Zeta Tank 2",
					// "tank_address" : "Super Manzana 3 - 403, Puerto Juarez",
					// "tank_last_refill_timestamp" : "1474896450",
					// "tank_reading" : "30",
					// "gas_company_logo" : "http://dev.mynube.gs/sites/default/files/2016-10/logosample.jpg",
					// "mimimum_gas_refill" : "250",
					// "gas_price" : "10",
					// "show_alert" : false
				// }, {
					// "tank_id" : "120",
					// "tank_title" : "Zeta Tank 1",
					// "tank_address" : "Urión 30, Col. Atlatilco",
					// "tank_last_refill_timestamp" : "1474897480",
					// "tank_reading" : "2",
					// "gas_company_logo" : "http://dev.mynube.gs/sites/default/files/2016-10/logosample.jpg",
					// "mimimum_gas_refill" : "250",
					// "gas_price" : "10",
					// "show_alert" : true
				// }]
			// }
		// };
		Logging.printConsoleLogs('get_tanks data:' + JSON.stringify(e));
		// setTimeout(function(){
			callback(e);
		// },1000);
	}, true);
};


