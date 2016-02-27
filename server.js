var http = require('http');
var port = process.env.PORT || 3000;
var fs = require('fs');
var server = http.createServer(handler);

var message;


function handler(request, response) {
  var endpoint = request.url;

  switch(endpoint) {
    case '/node':
        message = 'NODE Endpoint - I am so happy!';
        response.write(message);
        response.end();
      break;

    case '/girls':
        message = 'GIRLS Endpoint - I am so happy';
        response.write(message);
        response.end();
      break;

    case '/':
        response.writeHead(200, {"Content-Type" : "text/html"});

        fs.readFile(__dirname + '/public/index.html', function(error, file) {
          if(error) {
            console.log(error);
            return;
          }

          response.end(file);
        });

      break;

    default:
      message = 'I am so happy to be part of the NodeJs Workshop';
      response.write(message);
      response.end();

  }

}




server.listen(port, function() {
  console.log("Server is listening on port " + port + ' Enjoy :-)');

});