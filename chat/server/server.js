const express = require('express');
const app = express();
const cors = require('cors');
const http = require("http").Server(app);
const io = require('socket.io')(http);
const socket = require('./socket')
const server = require('./listen');
const bodyParser = require('body-parser');


const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

socket.connect(io, PORT);

server.listen(http, PORT);




app.get('/', function(req, res){
    res.sendFile(__dirname + '/../dist/index');
});

app.post('/api/login',function(req,res){
    let users = [
    {"email" : "email1","pwd" : "pwd1", "age": "5", "birthdate":"bd1", "valid": "true"}, 
    {"email" : "email2","pwd" : "pwd2", "age": "6", "birthdate":"bd2", "valid": "true"},
    {"email" : "email3","pwd" : "pwd3", "age": "10", "birthdate":"bd3", "valid": "true"}];   

    if (!req.body) {
        return res.sendStatus(400);
    }
    var customer = {};
    customer.email = "";
    customer.pwd = "";
    customer.age = "";
    customer.birthdate = "";
    customer.username = "";
    customer.valid = false;


    for (let i=0;i<users.length; i++){

        if (req.body.email == users[i].email && req.body.pwd == users[i].pwd){  
            customer.email = users[i].email;
            customer.pwd = users[i].pwd;
            customer.age = users[i].age;
            customer.birthdate = users[i].birthdate;
            customer.valid = true;
        }
    }   
    res.send(customer);
});