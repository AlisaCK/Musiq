const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/database');
const User = db.User;



module.exports = {
    authenticate,
    getAllUsers,
    getByUsername,
    addUser,
    setGoals,
    getGoals,
    getUserInfo,
    updateUserInfo,
}

async function storeKey(key, username){

}

async function authenticate({ username, password }) {

    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAllUsers() {
    //Returning the result of the promise.
    return await User.find().select('-hash');
}



async function getByUsername(username) {

    return await User.find({username:username}).select('-hash');
}


async function addUser(userParam) {

    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    else  if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();

}


async function setGoals(values, userN){
    console.log(values);
    console.log(userN);
    await User.updateOne({ _id: userN }, { $set: {minutegoal: parseInt(values.minutegoal), caloriegoal: parseInt(values.caloriegoal) } }, function(err, res) {
        if (err) throw err;
    });
}


async function getGoals(username){
    var user = await getByUsername(username);
    console.log(user);
    return {"caloriegoal": user[0].caloriegoal, "minutegoal": user[0].minutegoal};

}


async function updateUserInfo(values, userN){
  console.log(values);
  console.log(userN);
  //Todo: update everything in the user not just goals
  await User.updateOne({ _id: userN }, { $set: {minutegoal: parseInt(values.minutegoal), caloriegoal: parseInt(values.caloriegoal) } }, function(err, res) {
    if (err) throw err;
  });
}


// TODO: complete this function. It should return calorie and minute goals for a given user.
async function getUserInfo(username){
  var user = await getByUsername(username);
  console.log(user);
  //return all user stufff instead of just goals
  return user;

}
