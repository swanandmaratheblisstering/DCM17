// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var config = require('config');
var customWebservice = require('customWebservice');
var Logging = require('Logging');
var progressIndicator = require('utils/progressIndicator');
var pgIndicator = null;

get_attendees(addOnScrollView);

function get_attendees(_callback){
	pgIndicator = progressIndicator.getProgressIndicator();
	$.attendiesScreen.add(pgIndicator);
	
	var userId = Ti.App.Properties.getString("user_id", "");
	customWebservice.get_attendees( function(obj){
		$.attendiesScreen.remove(pgIndicator);
		if ((obj) && (obj !== null)) {
			if (obj.responseCode == 0) {
				Ti.UI.createAlertDialog({message : 'Please check your internet connection', title : L('Alert'), buttonNames : [L('Ok')]}).show();
			}else if (obj) {
				_callback(JSON.parse(obj));
			} else {
				Ti.UI.createAlertDialog({message : obj.message, title : L('Alert'), buttonNames : [L('Ok')]}).show();
			}
		}
	});
}

function addOnScrollView(obj){
	// alert(obj);
	
	for(var i=0; i<obj.length; i++){
		var attendeesBaseView = Ti.UI.createView({
			top : 20,
			left : 20,
			width : 140,
			height : 200,
			backgroundColor : '#2aa9de',
		});
		var attendeesImage = Ti.UI.createImageView({
			top : 0,
			width : 140,
			height : 140,
			backgroundColor : '#ffffff',
			// borderRadius : 70,
			borderWidth : 4,
			borderColor : '#ffffff',
			image : obj[i].user_picture,
			defaultImage : '/attendees/icon-user-default.png'
		});
		attendeesBaseView.add(attendeesImage);
		
		var attendeesName = Ti.UI.createLabel({
			text : obj[i].field_first_name +' '+obj[i].field_last_name,
			font : { fontSize : 13, fontWeight : 'bold' },
			color : '#ffffff',
			top : 145,
			height : 20,
			lines : 1,
			textAlign : 'center',
			width : 130
		});
		attendeesBaseView.add(attendeesName);
		
		var attendeesCompany = Ti.UI.createLabel({
			text : obj[i].field_organisation,
			font : { fontSize : 12 },
			color : '#ffffff',
			top : 180 
		});
		attendeesBaseView.add(attendeesCompany);
		
		$.attendeesScrollView.add(attendeesBaseView);
	}
}