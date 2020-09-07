module.exports = {

    listen: function(app, PORT){
        app.listen(PORT,()=>{
            var d = new Date();
            var n = d.getHours();
            var m = d.getMinutes();
            console.log("Server has been started on port : "+ PORT + n + ":"+ m)
        });
    }
}
