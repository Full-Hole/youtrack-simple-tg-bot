const http = require('@jetbrains/youtrack-scripting-api/http');
const token = '*'; //Тут нужен токен для работы
const chatid = '*'; //Тут нужен id чата
const URL = 'https://api.telegram.org/bot';
const APIURL = URL + token;

exports.sendMessage = function(message) {
  	let connection = new http.Connection();
    connection.addHeader("Content-Type", "application/json");

    let payload = {
        "chat_id": chatid,
        "text": message,
        "parse_mode": "HTML",
      };
  	let response = connection.postSync(APIURL+'/sendMessage', [], JSON.stringify(payload));
  if (!response.isSuccess) {
      console.log(response);    
    }

  return response.isSuccess;    

};
exports.getUpdate = function() {
  let connection = new http.Connection();
    connection.addHeader("Content-Type", "application/json");
    let response = connection.getSync(APIURL +'/getUpdates');
  if (!response.isSuccess) {
      console.log(response);    
    }
 
  return  response.isSuccess;
};
exports.getChat = function() {
  	let connection = new http.Connection();
  let payload = {
        "chat_id": chatid,
      };
    connection.addHeader("Content-Type", "application/json");
    let response = connection.postSync(APIURL +'/getChat',[],  JSON.stringify(payload));
  if (!response.isSuccess) {
      console.log(response);    
    }
  
  return  response.isSuccess;
};

function parseMarkdown(text) {
  text = text.replace(/\\/g, ''); //подгонка для Markdown
  text = text.replace(/\>/g, '\\>'); //подгонка для Markdown
  text = text.replace(/\*{2}/g, '*'); //подгонка для Markdown
  text = text.replace(/\./g, '\\.'); //подгонка для Markdown
  text = text.replace(/\_/g, '\\_'); //подгонка для Markdown
  text = text.replace(/\[/g, '\\['); //подгонка для Markdown
  text = text.replace(/\]/g, '\\]'); //подгонка для Markdown
  text = text.replace(/\(/g, '\\('); //подгонка для Markdown
  text = text.replace(/\)/g, '\\)'); //подгонка для Markdown
  text = text.replace(/\~/g, '\\~'); //подгонка для Markdown
  text = text.replace(/\`/g, '\\`'); //подгонка для Markdown
  text = text.replace(/\#/g, '\\#'); //подгонка для Markdown
  text = text.replace(/\+/g, '\\+'); //подгонка для Markdown
  text = text.replace(/\-/g, '\\-'); //подгонка для Markdown
  text = text.replace(/\=/g, '\\='); //подгонка для Markdown
  text = text.replace(/\|/g, '\\|'); //подгонка для Markdown
  text = text.replace(/\{/g, '\\{'); //подгонка для Markdown
  text = text.replace(/\}/g, '\\}'); //подгонка для Markdown
  text = text.replace(/\!/g, '\\!'); //подгонка для Markdown
  
  return text;
}

exports.escapeTelegramReservedSymbols = function(text) {
  return parseMarkdown(text);
};

exports.formatTelegramMessageBlock = function(header, text) {
  return '`*' + parseMarkdown(header) + ':` ' + parseMarkdown(text) + '\n';
};
