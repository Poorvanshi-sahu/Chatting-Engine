const io = require("socket.io")();
const socketapi = {
    io: io
};

var allusers = [];
var ids = []
    // Add your socket.io logic here!
io.on("connection", function(socket) {

    // Connection message
    console.log("A user connected", );

    console.log("joined");
    ids.push(socket.id);

    io.emit('ids', ids);

    socket.on('naam', (all) => {
        allusers.push(all)
        io.emit("naamreply", allusers);
    });

    // socket to send all the messages
    socket.on('text', (all) => {
        socket.broadcast.emit('reply', all);
    })

    socket.on('typing', (usrname) => {
        // console.log("sldkfjlsdkf", usrname);
        socket.broadcast.emit('replytyping', usrname);
    })

    // socket to show disconnectivity
    socket.on('disconnect', (all) => {
        console.log("asdfa", all)
        var index = ids.indexOf(socket.id);
        ids.splice(index, 1);
        allusers.splice(index, 1);
        io.emit("naamreply", allusers);
        io.emit('ids', ids)
        console.log('Disconnected')
    })

});
// end of socket.io logic

module.exports = socketapi;