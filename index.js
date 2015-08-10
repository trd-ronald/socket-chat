var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	var socketId = socket.id
    var clientIp = socket.request.connection.remoteAddress
    console.log(clientIp);
  
  socket.on('chat message', function(msg){
    io.emit('chat message', {message: msg, sender: clientIp});
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
