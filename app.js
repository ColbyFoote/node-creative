var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var people = [];
var events = [];
var messages = [];

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on("join", function(name) {
    console.log(name)
    socket.userName = name;
    
    socket.emit("userUpdate", "You have connected to the server.")
    socket.emit("getMessages", messages);
    socket.emit("getUsers", people);
    people.push(name);
    io.emit("newUser", name);
    var event = socket.userName + " has joined the chat."
    events.push(event)
    io.emit("userUpdate", event)
  })
  socket.on("newMessage", function(msg) {
    console.log(msg);
    var newMessage = {user:socket.userName, message:msg}
    messages.push(newMessage);
    io.emit("newMessage", newMessage);
  })
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

http.listen(4200, function() {
  console.log('listening on *:4200');
});
