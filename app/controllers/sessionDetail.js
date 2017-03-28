// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var html2as = require('nl.fokkezb.html2as');

$.sessionDetailScreen.addEventListener('open', function(evt){
	if (OS_ANDROID) {
		var actionBar = evt.source.activity.actionBar;
		if (actionBar) {
			actionBar.hide();
		}
	}
});
var title = args.data[0].title;
$.sessionTitle.text = title = title.replace("&#039;", "'");
$.sessionTime.text = args.data[0].field_session_time;
$.sessionRoom.text = args.data[0].field_seminar_room;

html2as(
	args.data[0].field_session_track,
	function(err, as) {
		if (err) {
			console.error(err);
		} else {
			$.sessionTrack.attributedString = as;
		}
	}
);

html2as(
	args.data[0].field_experience_level,
	function(err, as) {
		if (err) {
			console.error(err);
		} else {
			$.sessionExpLevel.attributedString = as;
		}
	}
);


$.speakersView.add(Ti.UI.createView({left : '60dp', height : '1dp', backgroundColor : 'gray'}));
for(var i=0; i<args.data.length; i++){
	var view = Ti.UI.createView({
		height : '55dp'
	});
	view.add(Ti.UI.createImageView({image : args.data[i].user_picture, left:"5dp", height:"40dp", width:"40dp", borderRadius:"20dp"}));
	view.add(Ti.UI.createLabel({top:'5dp', text:args.data[i].field_first_name, font : { fontWeight : 'bold', fontSize : '16dp' }, left : '60dp'}));
	view.add(Ti.UI.createLabel({bottom:'5dp', text:args.data[i].field_organisation, font : { fontSize : '16dp' }, left : '60dp'}));
	$.speakersView.add(view);
}
$.speakersView.add(Ti.UI.createView({left : '60dp', top : '4dp', height : '1dp', backgroundColor : 'gray'}));
// $.speakerImage.image = args.data[0].user_picture;
// $.speakerName.text = args.data[0].field_first_name;
// $.speakerCompany.text = args.data[0].field_organisation;

html2as(
	args.data[0].body,
	function(err, as) {
		if (err) {
			console.error(err);
		} else {
			$.sessionBody.attributedString = as;
		}
	}
);

function closeWindow(){
	$.sessionDetailScreen.close();
}
