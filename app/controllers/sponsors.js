// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var config = require('config');
var customWebservice = require('customWebservice');
var Logging = require('Logging');
var progressIndicator = require('utils/progressIndicator');
var pgIndicator = null;


get_sponsor(addOnScrollView);

function get_sponsor(_callback){
	pgIndicator = progressIndicator.getProgressIndicator();
	$.sponsorsScreen.add(pgIndicator);
	
	var userId = Ti.App.Properties.getString("user_id", "");
	customWebservice.get_sponsor( function(obj){
		$.sponsorsScreen.remove(pgIndicator);
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
	// alert('123');
	var html2as = require('nl.fokkezb.html2as');
	
	var categories = {},
	groupBy = "field_sponsor_category";
	
	for (var i = 0; i < obj.length; i++) {
		if (!categories[obj[i][groupBy]])
			categories[obj[i][groupBy]] = [];
		categories[obj[i][groupBy]].push(obj[i]);
	};
	
	for (key in categories) {
		if (categories.hasOwnProperty(key)) {
			
		    var lblHeader = Ti.UI.createLabel({
		    	top : 20,
				font : { fontSize : 18, fontWeight : 'bold' },
				color : '#7a7a7a',
		        text : "—— "+key +" ———"
		    });
		    $.sponsorsScrollView.add(lblHeader);
			
			if (categories[key].length){
				for (var i = 0; i < categories[key].length; i++) {
					var imgSponsor = Ti.UI.createImageView({
						width : 300,
						height : 200,
						image : categories[key][i].field_sponsor_logo,
						top : 10
					});
					$.sponsorsScrollView.add(imgSponsor);
				}
			}
		}
	}
	
	// for(var i=0; i<obj.length; i++){
		// var lblSponsorType = Ti.UI.createLabel({
			// top : 10,
			// font : { fontSize : 18 },
			// color : '#000000',
			// text : obj[i].field_sponsor_category
		// });
		// html2as(obj[i].field_sponsor_category, function(err, as) {
			// if (err) {
				// console.error(err);
				// html = "";
// 	
			// } else {
				// lblSponsorType.attributedString = as;
			// }
		// });
		// $.sponsorsScrollView.add(lblSponsorType);
// 		
		// var imgSponsor = Ti.UI.createImageView({
			// width : 300,
			// height : 200,
			// image : obj[i].field_sponsor_logo,
			// top : 10
		// });
		// $.sponsorsScrollView.add(imgSponsor);
	// }
}
