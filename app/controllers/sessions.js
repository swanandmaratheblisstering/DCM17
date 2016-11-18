// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var config = require('config');
var customWebservice = require('customWebservice');
var Logging = require('Logging');
var progressIndicator = require('utils/progressIndicator');
var pgIndicator = null;


// var approvedData = [ {title: 'Apples'}, {title: 'Bananas'}, {title: 'Carrots'}, {title: 'Potatoes'} ];
// var pendingData = [ {title: 'Apples1'}, {title: 'Bananas1'}, {title: 'Carrots1'}, {title: 'Potatoes1'} ];
var approvedData = [];
var pendingData = [];

get_sessions(addSessions, 'approvedData', 24);
get_sessions(addSessions, 'pendingData', 25);
function get_sessions(_callback, _type, param){
	if(_type == 'approvedData'){
		pgIndicator = progressIndicator.getProgressIndicator();
		$.sessionsScreen.add(pgIndicator);
	}
	
	param = param;
	
	var userId = Ti.App.Properties.getString("user_id", "");
	customWebservice.get_sessions( param, function(obj){
		if(_type == 'approvedData'){
			$.sessionsScreen.remove(pgIndicator);
		}
		if ((obj) && (obj !== null)) {
			if (obj.responseCode == 0) {
				Ti.UI.createAlertDialog({message : 'Please check your internet connection', title : L('Alert'), buttonNames : [L('Ok')]}).show();
			}else if (obj) {
				_callback(JSON.parse(obj), _type);
			} else {
				Ti.UI.createAlertDialog({message : obj.message, title : L('Alert'), buttonNames : [L('Ok')]}).show();
			}
		}
	});
}


function addSessions(obj, _type){
	if(_type == 'approvedData'){
		approvedData = [];
	}else{
		pendingData = [];
	}
	var obj1 = sortByKey(obj, 'name');
		
	var categories = {},
	groupBy = "name";

	for (var i = 0; i < obj1.length; i++) {
		if (!categories[obj1[i][groupBy]])
			categories[obj1[i][groupBy]] = [];
		categories[obj1[i][groupBy]].push(obj1[i]);
	};

	for (key in categories) {
		if (categories.hasOwnProperty(key)) {
			
			var section = Ti.UI.createTableViewSection();
        
		    var viewHeader = Ti.UI.createView({
		        height : '65dp',
		        width : Ti.UI.FILL,
		        backgroundColor : '#d8d8d8'
		    });
		    var imgHeader = Ti.UI.createImageView({
		    	left : 10,
		        width : 50,
		        height : 50,
		        borderRadius : 25,
		        borderWidth : 2,
		        borderColor : "#2aa9de",
		        image : categories[key][0].field_session_track_image
		    });
		    viewHeader.add(imgHeader);
		    var lblHeader = Ti.UI.createLabel({
		        width : '100%',
		        text : key,
		        font : {fontSize : 18, fontWeight : 'bold'},
		        color : '#000000 ',
		        left : 75
		    });
		    viewHeader.add(lblHeader);
		    section.headerView = viewHeader;
			
			if (categories[key].length){
				for (var i = 0; i < categories[key].length; i++) {
					var sectionRow = Ti.UI.createTableViewRow({
						height : 50
					});
					// var imgSession = Ti.UI.createImageView({
						// width : 40,
						// height : 40,
						// image : categories[key][i].field_session_track_image,
						// left : 3
					// });
					// sectionRow.add(imgSession);
					var sectionRowTitle = Ti.UI.createLabel({
						text : categories[key][i].title + ' \nSpeakers : ' + categories[key][i].field_speakers,
						font : { fontSize : 16 },
						left : 30,
						right : 10,
						color : '#000000'
					});
					sectionRow.add(sectionRowTitle);
					section.add(sectionRow);
				}
				if(_type == 'approvedData'){
					approvedData.push(section);
				}else{
					pendingData.push(section);
				}
			}
		}
	}
	
	$.tblSession.data = approvedData;
}

var updateTblSessionData = function(e){
	// alert(e.source.id);
	if(e.source.selected == false){
		if(e.source.id == 'lblApproved'){
			$.lblApproved.selected = true;
			$.lblPending.selected = false;
			$.lblApproved.backgroundColor = e.source.selectedColor;
			$.lblApproved.color = "#ffffff";
			$.lblPending.color = "#000000";
			$.lblPending.backgroundColor = '#d4eef8';
			$.tblSession.data = approvedData;
		}else{
			$.lblApproved.selected = false;
			$.lblPending.selected = true;
			$.lblPending.backgroundColor = e.source.selectedColor;
			$.lblPending.color = "#ffffff";
			$.lblApproved.color = "#000000";
			$.lblApproved.backgroundColor = '#d4eef8';
			$.tblSession.data = pendingData;
		}
	}
};

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
