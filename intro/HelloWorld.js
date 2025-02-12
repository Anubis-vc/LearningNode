var http = require('http');
var myModule = require('./firstModule.js')

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello World!\n');
  res.end("The date and time are currently: " + myModule.myTime());
}).listen(8080);