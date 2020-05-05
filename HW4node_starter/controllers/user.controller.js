const userService = require('../services/user.service')
var my_client_id = 'b344eb9c6f034888b47d3ebf5fd823ee'; // Your client id
var client_secret = 'c4640761c2ea41888c5aaa744f7940a0'; // Your secret
var redirect_uri = 'http://localhost:3030/callback'; // Your redirect uri

module.exports = {
    authenticate,
    getAllUsers,
    register,
    getGoals,
    setGoals,
    getUserInfo,
    updateInformation,
    auth
};

function auth(req, res, next){
    console.log("potato");

    var scopes = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + my_client_id +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri));
}

function authenticate(req, res, next) {
    console.log("Authenticate():", req.body);
       userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAllUsers(req, res, next) {
    //  console.log("getAll", req.body);
    userService.getAllUsers()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function register(req, res, next) {

   userService.addUser(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}



//TODO: get goals (calorie goal and minute goal) for the specific username in 'req.params...' and send the JSON back the to the user that requested the information. Hint: write a middleware function and add it to the exports.
function getGoals(req, res, next) {
      console.log("getgoals");
    userService.getGoals(req.params.username)
        .then(goals => res.json(goals))
        .catch(err => next(err));
}


//TODO: set goals (calorie goal and minute goal) for a user. Hint: write a middleware function and add it to the module exports.
function setGoals(req, res, next) {
    userService.setGoals(req.body, req.user.sub)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getUserInfo(req, res, next) {
  console.log("getgoals");
  userService.getUserInfo(req.params.username)
    .then(goals => res.json(goals))
    .catch(err => next(err));
}

//TODO: set goals (calorie goal and minute goal) for a user. Hint: write a middleware function and add it to the module exports.
function updateInformation(req, res, next) {
  userService.updateUserInfo(req.body, req.user.sub)
    .then(() => res.json({}))
    .catch(err => next(err));
}
