var config = require('config');
var loggingFileName = 'Nube'+Ti.App.version+'.txt';

/**
 * for writing logs in a file
 * @param {String} _text
 */
function writeLogs(_text) {
	if(config.isLoggingEnabled){
		var loggingFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, loggingFileName);
		// Ti.API.info('loggingFile.exists() : '+loggingFile.exists());
		var stringDate = new Date();
		stringDate = stringDate.toString();
		var fileData = '\n'+stringDate+' : '+_text;
		loggingFile.write(fileData, true);
	}
};
exports.writeLogs = writeLogs;

/**
 * print all written logs from the file
 */
function sendWrittenLogs() {
	var loggingFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, loggingFileName);
	var loggingFileData = loggingFile.read();
	Ti.API.info('loggingFileData'+loggingFileData);
};
exports.sendWrittenLogs = sendWrittenLogs;

/**
 * print logs in the console
 * @param {String} _text
 */
function printConsoleLogs(_text){
	if(config.isLoggingEnabled){
		Ti.API.info(_text);
		writeLogs(_text);
	}
}
exports.printConsoleLogs = printConsoleLogs;
