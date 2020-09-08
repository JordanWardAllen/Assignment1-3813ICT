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
            }),
            socket.on('auth', (auth) =>{


                console.log(auth);
                fs.readFile('../dataExternal.json', (err, data) => {
                    if (err) throw err;
                    var fileData = JSON.parse(data)
                    stringedData = JSON.stringify(fileData)
                    // console.log(fileData.User[0]);

                var customer = {};
                customer.email = "";
                customer.pwd = "";
                customer.age = "";
                customer.birthdate = "";
                customer.username = "";
                customer.valid = "false";

                for (let i=0;i<fileData.User.length; i++){
                    if (auth.email == fileData.User[i].email && auth.pwd == fileData.User[i].pwd){  
                        customer.email = fileData.User[i].email;
                        customer.pwd = fileData.User[i].pwd;
                        customer.age = fileData.User[i].age;
                        customer.birthdate = fileData.User[i].birthdate;
                        customer.valid = "true";
                    }
                } 
                io.emit('auth', customer);
                console.log(customer); 
            })
        })

        });
    }



}