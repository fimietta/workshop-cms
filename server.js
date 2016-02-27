var http = require('http');
var port = process.env.PORT || 3000;
var fs = require('fs');
var server = http.createServer(handler);
var querystring = require('querystring');


function sendMessage(message, response) {
  response.write(message);
  response.end();
}

function sendFile(path, response) {
  fs.readFile(path, function(error, file) {
    if(error) {
      console.log(error);
      return;
    }
    response.end(file);
  });
}

function getContentType(extension) {
  switch(extension) {
    case 'css':
      return {"Content-Type" : "text/css"};
      break;
    case 'jpg':
      return {"Content-Type" : "image/jpg"};
      break;
    case 'html':
      return {"Content-Type" : "text/html"};
      break;

  }
}


function readFormData(request, response) {
  var allData = '';
  request.on('data', function(chunkData) {
    allData += chunkData;
  });

  request.on('end', function() {
    var convertedData = querystring.parse(allData);
    console.log(convertedData);
    response.writeHead(301, {"Location": "/"});
    response.end();
  });
}


function handler(request, response) {
  var endpoint = request.url;

  switch(endpoint) {
    case '/node':
        sendMessage('NODE Endpoint - I am so happy!', response);
      break;

    case '/girls':
        sendMessage('GIRLS Endpoint - I am so happy!', response);
      break;

    case '/':
        response.writeHead(200, getContentType('html'));
        sendFile(__dirname + '/public/index.html', response);
      break;

    case '/create-post':
        readFormData(request, response);
      break;

    default:
      var extension = endpoint.split(".")[1];
      response.writeHead(200, getContentType(extension));
      sendFile(__dirname + '/public' + endpoint, response);
  }

}




server.listen(port, function() {
  console.log("Server is listening on port " + port + ' Enjoy :-)');

});