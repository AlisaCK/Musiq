var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');


router.post('/authenticate', userController.authenticate);
router.post('/register', userController.register);
router.get('/allusers', authorize(Role.admin),userController.getAllUsers);
router.post('/setgoals', userController.setGoals);
router.get('/getgoals/:username', userController.getGoals);
router.post('/updateInfo', userController.updateInformation);
router.get('/getInfo/:username', userController.getUserInfo);
router.get('/auth', userController.auth);

module.exports = router;
