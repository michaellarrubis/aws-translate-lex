const https = require('https')
const lexHelper = require('./lexHelper.js')
const translateApi = require('./translateApi.js')

exports.handler = async (event, context, callback) => {
    if(event.currentIntent.name == 'translate') {
        return translateApi.handleEvent(event, callback)
    }
    return lexHelper.close(event.sessionAttributes, 'Failed', 'Sorry, I couldn\'t understand what you were saying.')
};
