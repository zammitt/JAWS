/**
 * API: Chat: Send
 */

// Dependencies
var MiddlewareIncoming = require('jaws-lib').middleware.Incoming;

var ModelChat = require('jaws-lib').models.Chat;


// Function
exports.handler = function (event, context) {

    // Process Incoming Request
    MiddlewareIncoming.process(event, context, function (event, context) {

        //send chat message
        ModelChat.send(event.body, function (error) {

            /**
             * Return
             */
             

            return context.succeed({ success: true, body: event.body, error: error });

        });

    });
};