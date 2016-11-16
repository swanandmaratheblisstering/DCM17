// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var config = require('config');
var customWebservice = require('customWebservice');
var Logging = require('Logging');
var progressIndicator = require('utils/progressIndicator');
var pgIndicator = null;

get_volunteers(addOnScrollView);

function get_volunteers(_callback){
	pgIndicator = progressIndicator.getProgressIndicator();
	$.volunteersScreen.add(pgIndicator);
	
	var userId = Ti.App.Properties.getString("user_id", "");
	customWebservice.get_volunteers( function(obj){
		$.volunteersScreen.remove(pgIndicator);
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
	
	var categories = {},
	groupBy = "field_dcm_departments";
	
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
		        text : "— "+key +" ——",
		        textAlign : 'center',
		        width : '100%'
		    });
		    $.volunteerScrollView.add(lblHeader);
			
			if (categories[key].length){
				for (var i = 0; i < categories[key].length; i++) {
					
					var volunteerBaseView = Ti.UI.createView({
						top : 20,
						left : 20,
						width : 140,
						height : 200,
					});
					var volunteerImage = Ti.UI.createImageView({
						top : 5,
						width : 140,
						height : 140,
						// backgroundColor : '#2aa9de',
						borderRadius : 70,
						borderWidth : 4,
						borderColor : '#2aa9de',
						image : categories[key][i].user_picture
					});
					volunteerBaseView.add(volunteerImage);
					
					var volunteerName = Ti.UI.createLabel({
						text : categories[key][i].field_first_name +' '+categories[key][i].field_last_name,
						font : { fontSize : 14 },
						color : '#000000',
						top : 155,
						height : 20,
						lines : 1
					});
					volunteerBaseView.add(volunteerName);
					
					var volunteerCompany = Ti.UI.createLabel({
						text : categories[key][i].field_organisation,
						font : { fontSize : 12 },
						color : '#000000',
						top : 175 
					});
					volunteerBaseView.add(volunteerCompany);
					
					$.volunteerScrollView.add(volunteerBaseView);
					
				}
			}
		}
	}
	
			// for(var i=0; i<obj.length; i++){
				// var volunteerBaseView = Ti.UI.createView({
					// top : 20,
					// left : 20,
					// width : 140,
					// height : 200,
				// });
				// var volunteerImage = Ti.UI.createImageView({
					// top : 5,
					// width : 140,
					// height : 140,
					// // backgroundColor : '#2aa9de',
					// borderRadius : 70,
					// borderWidth : 4,
					// borderColor : '#2aa9de',
					// image : obj[i].user_picture
				// });
				// volunteerBaseView.add(volunteerImage);
// 				
				// var volunteerName = Ti.UI.createLabel({
					// text : obj[i].field_first_name +' '+obj[i].field_last_name,
					// font : { fontSize : 14 },
					// color : '#000000',
					// top : 155,
					// height : 20,
					// lines : 1
				// });
				// volunteerBaseView.add(volunteerName);
// 				
				// var volunteerCompany = Ti.UI.createLabel({
					// text : obj[i].field_organisation,
					// font : { fontSize : 12 },
					// color : '#000000',
					// top : 175 
				// });
				// volunteerBaseView.add(volunteerCompany);
// 				
				// $.volunteerScrollView.add(volunteerBaseView);
			// }
}