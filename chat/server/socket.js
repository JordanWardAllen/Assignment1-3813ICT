const fs = require('fs');
const file = require('../src/assets/data.json')
// fs.readFile('../dataExternal.json', (err, data) => {
//     if (err) throw err;
//     fileData = JSON.parse(data)   
//     // console.log(deletedUserId)
//     // console.log(fileData.User[0])            
// })

module.exports = {
    connect: function(io, PORT){
        io.on('connection', (socket)=> {
            // console.log('socket getUsers fired')
            fs.readFile('../dataExternal.json', (err, data) => {
                if (err) throw err;
                fileData = JSON.parse(data)   
                // console.log(deletedUserId)
                // console.log(fileData.User[0])        
                io.emit('getUsers', fileData.User);    
            })
            // console.log(fileData)
            

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
                    // console.log(stringedData)
                    
                    fs.writeFile('../dataExternal.json', stringedData, (err) =>{
                        if (err) throw err;
                        // console.log(stringedData)
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
                customer.id = "";
                customer.role = "";
                customer.username = "";
                customer.valid = "false";

                for (let i=0;i<fileData.User.length; i++){
                    if (auth.email == fileData.User[i].email && auth.pwd == fileData.User[i].pwd){  
                        customer.email = fileData.User[i].email;
                        customer.pwd = fileData.User[i].pwd;
                        customer.id = fileData.User[i].id;
                        customer.role = fileData.User[i].role;
                        customer.valid = "true";
                    }
                } 
                io.emit('auth', customer);
                // console.log(customer); 
            })
        }),
        socket.on('user', (user) =>{
            console.log(user.LoggedInUserRole)
            fs.readFile('../dataExternal.json', (err, data) => {
                if (err) throw err;
                if (user.LoggedInUserRole == "Super"){
                    user.role = "Group Admin";
                } else if (user.LoggedInUserRole == "Group Admin"){
                    user.role = "Group Assis";
                }
                
                var fileData = JSON.parse(data)
                fileData.User.push(user)
                stringedData = JSON.stringify(fileData)

                fs.writeFile('../dataExternal.json', stringedData, (err) =>{
                    if (err) throw err;
                    // console.log(stringedData)
                })
            })
        }),
        socket.on('deletedUserId' , (deletedUserId) =>{
            // console.log(deletedUserId)

            fs.readFile('../dataExternal.json', (err, data) => {
                if (err) throw err;
                var fileData = JSON.parse(data)   
                for (let i = 0; i< fileData.User.length; i++){
                    if (fileData.User[i].userId == deletedUserId){
                        console.log('it fired')
                        fileData.User.splice(i, 1);
                        // delete fileData.User[i];
                    }
                }
                
                stringedData = JSON.stringify(fileData)  
                console.log(stringedData)             
                fs.writeFile('../dataExternal.json', stringedData, (err) =>{
                    if (err) throw err;
                    console.log("Write attempt")
                    console.log(stringedData)
                })
                io.emit('getUsers', fileData.User);
            })
        }),
        socket.on('getUsers', (getUsers)=>{
            console.log('socket getUsers fired')
            // socket.emit('getUsers', fileData.User);
            fs.readFile('../dataExternal.json', (err, data) => {
                if (err) throw err;
                var fileData = JSON.parse(data)   
                // console.log(deletedUserId)
                console.log(fileData.User[0])            
            })
            console.log('init')
            io.emit('getUsers', fileData.User);
            
        }),
        socket.on('userIdToUpgrade', (userIdToUpgrade) =>{
            fs.readFile('../dataExternal.json', (err, data) => {
                if (err) throw err;
                var fileData = JSON.parse(data)  
                for (let i = 0; i< fileData.User.length; i++){
                    if (fileData.User[i].userId == userIdToUpgrade){
                        fileData.User[i].role = "Super"
                        console.log(fileData.User[i])
                    }
                }   
                stringedData = JSON.stringify(fileData)  
                fs.writeFile('../dataExternal.json', stringedData, (err) =>{
                    if (err) throw err;
                    console.log("Write attempt")
                    console.log(stringedData)
                })        
            })
        })

        });
    }



}