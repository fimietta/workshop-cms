var http = require('http');
var port = process.env.PORT || 3000;
var handler = require('./src/handlers');

var server = http.createServer(handler);


server.listen(port, function() {
  console.log("Server is listening on port " + port + ' Enjoy :-)');

});