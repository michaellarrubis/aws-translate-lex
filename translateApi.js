const lexHelper = require('./lexHelper.js')
const AWS = require('aws-sdk')

async function handleEvent(event, callback) {
    // TODO use weather api
    const intentName = event.currentIntent.name
    const slots = event.currentIntent.slots
    const question = 'What would you like to translate?'
    
    if (!slots.phrase_text) {
        let data =  await translatePhrase(slots.source_lang, slots.target_lang, question)
        
        const msg = {
            'contentType': 'PlainText',
            'content': data
        }
        return lexHelper.elicitSlot(event.sessionAttributes, intentName, slots, 'phrase_text', msg)
    } else if (slots.phrase_text) {
        let data =  await translatePhrase(slots.source_lang, slots.target_lang, slots.phrase_text)
        return lexHelper.confirmIntent(data, intentName)
    }
    return lexHelper.confirmIntent('Test succeeds', intentName)
}

async function translatePhrase(source, target, phrase) {
  let translate = new AWS.Translate();

  let params = {
    Text: phrase,
    SourceLanguageCode: source,
    TargetLanguageCode: target
  };
  
  return new Promise((resolve, reject) => {
    translate.translateText(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            resolve('error')
        }
        if (data) {
            resolve(data.TranslatedText.toString())
        }
    });
  })
}
exports.handleEvent = handleEvent