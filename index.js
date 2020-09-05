const express = require('express');
const app = express();
const port = 3001;




app.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
  });


app.get('/', (req, res) => {
    let users = {
        "users" : [
            {"userId" : "TEST1", "userName" : "Test Person 1", "security" : "ADMIN"},
            {"userId" : "TEST2", "userName" : "Test Person 2", "security" : "ADMIN"},
            {"userId" : "TEST3", "userName" : "Test Person 3", "security" : "ADMIN"},
            {"userId" : "TEST4", "userName" : "Test Person 4", "security" : "ADMIN"},
        ]
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json");
    res.json(users);
})

app.listen(port, () => {
  console.log(`User Maintenance app listening at http://localhost:${port}`)
});