var fs = require('fs');
var querystring = require('querystring');




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
  var method = request.method;
  var extension = endpoint.split(".")[1];

  switch(endpoint) {
    case '/':
        response.writeHead(200, getContentType(extension));
        respondWithFile('/../public/index.html', response);
      break;

    case '/create/post':

        if(method === 'POST') {
          readFormData(request, response);
        } else {
          response.writeHead(301, {"Location": "/"});
          response.end();
        }
      break;

    default:
      response.writeHead(200, getContentType(extension));
      respondWithFile('/../public' + endpoint, response);
      break;
  }

}


function respondWithFile(path, response) {

  fs.readFile(__dirname + path, function(err,data) {

    if(err) {
      console.log(err);
      return;
    }
    response.end(data);

  });

}

module.exports = handler;