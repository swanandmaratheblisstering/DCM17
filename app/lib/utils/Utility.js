var moment = require('alloy/moment');

exports.noValidSession = function() {
	Ti.App.Properties.setObject("UserObject", null);
	Ti.App.Properties.setString('csrfToken', null);
	Ti.App.Properties.setString('sessionName', null);
	Ti.App.Properties.setString('sessionId', null);

	config.userImage = "";
	config.userName = "";
	config.userRole = "";
	config.firstName = "";
	config.lastName = "";
	config.isUploading = false;
	Alloy.createController('LoginScreen').getView().open();
	alert('Your session is no longer valid. Please login once again.');

};

/**
 * Call to number
 * @param {Object} number
 */
exports.makeCall = function(number) {
	try {
		number += "";
		number = number.replace(" ", "");

		var confomAlert = Ti.UI.createAlertDialog({
			title : 'TimeGrab',
			message : 'Do you want to make a call?',
			buttonNames : ['Cancel', 'Call']
		});
		confomAlert.addEventListener('click', function(e) {
			if (e.index == 1) {
				if (OS_IOS) {
					var phoneNum = "telprompt:" + number;
					if (Ti.Platform.canOpenURL(phoneNum)) {
						Ti.Platform.openURL(phoneNum);
					} else {
						alert('Call facility not available on device');
					}
				} else {
					var phoneNum = "tel:" + number;
					Ti.Platform.openURL(phoneNum);
				}
			}
		});
		confomAlert.show();
	} catch(e) {
		Ti.API.info('ERROR IN MAKING A CALL');
	}
};

/**
 * Send an email
 * @param {String} emailid
 * @param {String} message
 * @param {Function} callBack
 */
exports.sendMail = function(emailId, callBack) {
	var emailDialog = Ti.UI.createEmailDialog();
	if (emailDialog.isSupported()) {
		emailDialog.toRecipients = [emailId];
		emailDialog.open();
		emailDialog.addEventListener('complete', function(e) {
			Ti.API.info('Email Dialog:: ' + JSON.stringify(e));
			switch(e.result) {
			case emailDialog.FAILED:
				break;
			case emailDialog.SAVED:
				break;
			case emailDialog.CANCELLED:
				break;
			case emailDialog.SENT:
				break;
			}
		});
	} else {
		alert('Email facility not available on device');
	}
};

function saveFileInDevice(filename, fileData) {
	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename);
	file.write(fileData);
	return file.resolve();
};
exports.saveFileInDevice = saveFileInDevice;
