const fs = require('fs');
const file = require('../src/assets/data.json')

module.exports = {
    connect: function(io, PORT){
        io.on('connection', (socket)=> {
        console.log("User connection on port" + PORT + ":" + socket.id);
            socket.on('message', (message)=>{
                io.emit('message', message);
            }),
            socket.on('chat', (chat)=>{       
                // stringJson :JSON.stringify(chat)
                // stringObj : JSON.parse(this.stringJson)
                // console.log(chat)
                // io.emit('chat', chat);

                fs.readFile('../dataExternal.json', (err, data) => {
                    if (err) throw err;
                    var fileData = JSON.parse(data)
                    
                    fileData.Chat.push(chat)
                    stringedData = JSON.stringify(fileData)
                    console.log(stringedData)
                    
                    fs.writeFile('../dataExternal.json', stringedData, (err) =>{
                        if (err) throw err;
                        console.log(stringedData)
                    })
                })
            })

        });
    }



}