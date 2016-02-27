var http = require('http');
var server = http.createServer();
var port = process.env.PORT || 3000;


server.listen(port, function() {
  console.log("Server is listening on port " + port + ' Enjoy :-)');

});