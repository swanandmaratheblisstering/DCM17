var config = (function() {


	//Dev Url//
 	// this.baseEndpoint = "http://dev.mynube.gs";
 	
 	//Stage Url//
 	// this.baseEndpoint = "http://stage.mynube.gs";
 	
	//Live Url//
 	this.baseEndpoint = "http://dev-drupalcampmumbai2017.pantheonsite.io";

	//Production Url//
	// this.baseEndpoint = "https://secure.timegrab.com/";
	
	this.apiVersion = "v1";
	this.deviceToken = "";
	this.featureMsg = "This feature is not available.";
	this.offileFeatureMsg = "This feature is not available when offline.";
	this.internetFailureMsg = "Please check your internet connection";
	this.isLoggingEnabled = true;

	return this;
})();
module.exports = config;
