/** \file webService.js
 * @author Ajeet Maurya
 * Javascript file to call JSON webService and XMLRPC webService.
 */

/** function: callWebServiceJSON
 * Used to call JSON webService
 *
 * Parameters :
 * httpRequest - variable to hold the type of request(POST or GET etc).
 * endpoint - webService URL
 * param - Parameter to be send with webService call
 * (function) callback - A callback function that will return the webService responce.
 *
 * Returns:
 * webService response.
 */
exports.callWebServiceJSON = function(httpRequest, endpoint, param, header, data_type, fileUpload, callback, isRest) {
	/*
	 * Checking Network connection
	 */
	var Logging = require('Logging');
	var logData = httpRequest + JSON.stringify(param);
	// Logging.writeLogs(logData);
	var response = {};
	// Ti.API.info("callWebServiceJSON " + endpoint + '  endpoint param  ' + JSON.stringify(param) + "  header  " + JSON.stringify(header));
	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
		response.responseCode = 000;
		response.responseMsg = 'Error reaching to Server.No internet connectivity';
		callback(response);
	}

	var xhr = Titanium.Network.createHTTPClient({

		onload : function(e) {
			// Titanium.API.info("The Response is" + JSON.stringify(this.responseText));
			var Logging = require('Logging');
			var logData = 'onload : ' + JSON.stringify(this.responseText);
			// Logging.writeLogs(logData);
			try{
				callback(JSON.parse(this.responseText));
			}catch(e){
				callback(this.responseText);
			}
		},

		onerror : function(e) {
			// Titanium.API.info("The Response is" + JSON.stringify(this));
			// var Logging = require('Logging');
			// var logData = 'onerror : ' + JSON.stringify(this);
			// Logging.writeLogs(logData);
			response.responseCode = xhr.status;
			if (response.responseCode == 0)
				response.responseMsg = "Error reaching to Server. No internet connectivity";
			else
				response.responseMsg = [];
			callback(response);
		},

		timeout : 60000

	});
	xhr.open(httpRequest, endpoint);
	if (header.length > 0) {
		var header_string = "";
		var len = header.length;
		var name;
		var data;
		for (var i = 0; i < len; i++) {
			name = header[i].name;
			data = header[i].data;
			xhr.setRequestHeader(name, data);
		}
	}
	if (data_type != "plain") {
		if ((isRest == true) || (isRest == undefined)) {
			xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
		}
	}

	if (fileUpload == true) {
		xhr.setRequestHeader("enctype", "multipart/form-data");
	}

	if (param === "") {
		xhr.send();
	} else {
		if ((isRest == true) || (isRest == undefined)) {
			xhr.send(JSON.stringify(param));
		} else if (isRest == false) {
			xhr.send(param);

		}
	}
	
	return xhr;
};
/** function: callWebServiceXMLRPC
 * Used to call XMLRPC webService
 *
 * Parameters :
 * httpRequest - variable to hold the type of request(POST or GET etc).
 * endpoint - webService URL
 * param - Parameter to be send with webService call
 * (function) callback - A callback function that will return the webService responce.
 *
 * Returns:
 * webService response.
 */
exports.callWebServiceXMLRPC = function(httpRequest, endpoint, param, header, data_type, fileUpload, callback) {
	var response = {};
	if (Titanium.Network.networkType == Titanium.Network.NETWORK_NONE) {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'Error!',
			message : "The only thing keeping you from us is an internet connection issue. Let's try that again.",
			buttonNames : ['OK']
		});
		alertDialog.show();
		return;
	}
	var jsonData = [];

	var xhr = Titanium.Network.createHTTPClient({

		onload : function(e) {
			var result = this.responseXML;
			// Titanium.API.info("onload response is " + this.responseXML);
			callback(result.documentElement);

		},
		onerror : function(e) {

			// Titanium.API.info("Error response is" + this.responseText);
			callback(this.responseText);
		},
		timeout : 20000

	});

	xhr.open(httpRequest, endpoint);
	//  xhr.clearCookies(endpoint);
	if (header.length > 0) {
		var header_string = "";
		var len = header.length;
		var name;
		var data;
		for (var i = 0; i < len; i++) {
			name = header[i].name;
			data = header[i].data;
			xhr.setRequestHeader('"' + name + '"', '"' + data + '"');
		}
	}
	xhr.setRequestHeader("Content-Type", "application/xml; charset=utf-8");
	if (fileUpload == true) {
		xhr.setRequestHeader("enctype", "multipart/form-data");
	}

	//creating the xml format for webService
	// Ti.API.info("param is :" + param);
	if (param === "") {
		// Ti.API.info('got you');
		xhr.send();
	} else {

		xhr.send(param);

	}
};

