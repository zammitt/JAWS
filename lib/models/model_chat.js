/**
 * Model: Chat
 * - Chat messages
 */


// Dependencies
var Utilities = require('../utilities/utilities');

var moment = require('moment');
var AWS = require('aws-sdk');

// Export
module.exports = new Chat();

function Chat() {}



/**
 * Send
 */

Chat.prototype.send = function(data, callback) {

    // Defaults
    var _this = this;


    /**
     * Validate
     */

    if (!data.message) return callback({
        status: 400,
        message: 'Bad Request: Message is required'
    }, null);

    if (!data.username) return callback({
        status: 400,
        message: 'Bad Request: Username is required'
    }, null);


	/**
		* Instantiate
		*/

	var chat = {
		_id: Utilities.generateID('chat'),
		message: data.message ? data.message : null,
		username: data.username ? data.username : null,
		created: moment().unix()
	};


	/**
		* TODO: Save to db
		*/

	
	/** Send to SNS */
	
	var sns = new AWS.SNS();
	var params = {
		TargetArn:'arn:aws:sns:us-west-2:007147146369:JAWS-Chat',
		Message: JSON.stringify(chat),
		Subject: 'TestSNS'
	};
	
	sns.publish(params, function(err,data){
			if (err) {
				return callback(err);
			} else {
				return callback(null);
			}
		});
	
}