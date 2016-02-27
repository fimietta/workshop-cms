var http = require('http');
var handler = require('./src/handlers');

var server = http.createServer(handler);



server.listen('3000', function() {

  console.log('Listening and enjoy the server');

});