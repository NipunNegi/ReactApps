var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/',function(req,res){
  res.send('<h1>Hello World</h1>');
});
io.on('connection',function(socket){
    console.log("a user connected");
     socket.on("chatMessage",function(msg){
         console.log("message:"+JSON.stringify(msg.msg));
         io.emit("chatMessage",msg);

    });
});


http.listen(3001,function(){
    console.log("listening on *:3001");
});