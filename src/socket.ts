const sockets = function(io: any) {

    io.on("connection", function(socket: any) {
        console.log("a user connected");
      });
      
}

export = sockets;