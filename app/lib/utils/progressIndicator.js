/**
 * @author Swanand Marathe
 */

exports.getProgressIndicator = function() {

	var color = 'white';
	// alert('profress');

	var transparentView = Ti.UI.createView({
		width : '100%',
		height : '100%',
		enabled : false,
		backgroundColor : '#000000',
		opacity : 0.6,
		zIndex : 100,
		bubbleParent : false,
	});
	transparentView.addEventListener('click', function(e) {
		//Do Nothing//
	});

	var loadingView = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		enabled : false,
		backgroundColor : 'transparent',
		zIndex : 101,
		touchEnabled : false,
		bubbleParent : false,
		layout : 'horizontal',
		top : '50%'
	});

	var style;
	if (OS_IOS) {
		style = Ti.UI.iPhone.ActivityIndicatorStyle.BIG_DARK;
	} else {
		style = Ti.UI.ActivityIndicatorStyle.DARK;
	}
	var activityIndicator = Titanium.UI.createActivityIndicator({
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		left : '30%',
		style : style
	});

	var loadingLabel = Ti.UI.createLabel({
		text : 'Loading...',
		font : {
			fontSize : '16sp',
			// fontFamily :Alloy.Globals.FONTS.ROBOTO_REGULAR
		},
		color : color,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		left : '5%',
	});

	loadingView.add(activityIndicator);
	loadingView.add(loadingLabel);
	transparentView.add(loadingView);

	activityIndicator.show();
	return transparentView;
};
