var http = require('http');
var port = process.env.PORT || 3000;

var message = 'I am so happy to be part of the NodeJs Workshop';

function handler(request, response) {
  response.writeHead(200, {"Content-Type" : "text/html"});
  response.write(message);
  response.end();
}


var server = http.createServer(handler);


server.listen(port, function() {
  console.log("Server is listening on port " + port + ' Enjoy :-)');

});