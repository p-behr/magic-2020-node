const express = require('express');
const app = express();
const port = 3001;


let users = [
  {"userId" : "NODE1", "userName" : "MAGiC Node 1", "security" : "ADMIN"},
  {"userId" : "NODE2", "userName" : "MAGiC Node 2", "security" : "ADMIN"},
  {"userId" : "NODE3", "userName" : "MAGiC Node 3", "security" : "ADMIN"},
  {"userId" : "NODE4", "userName" : "MAGiC Node 4", "security" : "ADMIN"},
]

const isDuplicateUser = (newUser) => {
  let error = false;
  users.forEach((user)=>{
      if (user.userId === newUser.userId) {
          error = true;
      }
  });
  return error;
}


app.use(express.static('static'));
app.use(express.json());


app.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
  });


/**
 * GET /api/user
 * Webservice to return the list of users
 */
app.get('/api/user', (req, res) => {
    let response = {
      "success" : true,
      "users" : users
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json");
    res.json(response);
})



/**
 * POST /api/user
 * Webservice to add a new user
 */
app.post('/api/user', (req, res) => {

  let response = {
    "success" : undefined,
    "message" : undefined,
    "users" : undefined
  }

  if (!isDuplicateUser(req.body)) {
    users.push({
      userId: req.body.userId,
      userName: req.body.userName,
      security: req.body.security
    });
    response.success = true;
    response.message = 'User was added (YAY!)',
    response.users = users;
  } else {
    console.log('Duplicate');
    response.success = false;
    response.message = 'Duplicate User not allowed',
    response.users = users;
  }
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Content-Type", "application/json");
  res.json(response);
});




/**
 * DELETE /api/user
 * Webservice to remove a user
 */
app.delete('/api/user', (req, res) => {

  const userId = req.body.userId;

  let response = {
    "success" : undefined,
    "message" : undefined,
    "users" : undefined
  }

  // Filter the requested user id out of the user array
  const newUsers = users.filter((user) => user.userId !== userId );

  if (newUsers.length === users.length) {
    response.success = false;
    response.message = `UserID ${userId} not found`,
    response.users = users;
  } else {
    users = newUsers;
    response.success = true;
    response.message = `UserID ${userId} deleted`,
    response.users = users;
  }
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Content-Type", "application/json");
  res.json(response);
});




/**
 * PUT /api/user
 * Webservice to update a user
 */
app.put('/api/user', (req, res) => {

  const userId = req.body.userId;
  const userName = req.body.userId;
  const security = req.body.security;

  let response = {
    "success" : false,
    "message" : `UserID ${userId} not updated.`,
    "users" : undefined
  }

  const newUsers = users.map((user) => {
    if (user.userId === userId) {
      response.success = true;
      response.message = `UserID ${userId} updated.`;
      return { userId, userName, security };
    }
    return user;
  });

  response.users = users;
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Content-Type", "application/json");
  res.json(response);
});



/**
 * START THE WEBSERVER
 */
app.listen(port, () => {
console.log(`User Maintenance app listening at http://localhost:${port}`)
});