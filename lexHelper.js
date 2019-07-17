exports.elicitSlot = function (sessionAttributes, intentName, slots, slotToElicit, message, responseCard) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'ElicitSlot',
            intentName,
            slots,
            slotToElicit,
            message,
        },
    };
}

exports.confirmIntent = function (message, intentName) {
    return {
        dialogAction: {
            type: 'ConfirmIntent',
            intentName: intentName,
            message: {
                contentType: 'PlainText',
                content: message,
            },
        },
    }
}

exports.close = function (sessionAttributes, fulfillmentState, message, responseCard) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message: {
                contentType: 'PlainText',
                content: message,
            },
            responseCard,
        },
    };
}