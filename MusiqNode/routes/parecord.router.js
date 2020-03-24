var express = require('express');
var router = express.Router();
const parecordController = require('../controllers/parecord.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');

router.delete('/:date', authorize(Role.admin), parecordController.deletePArecord)
router.post('/addparecord', authorize(Role.admin), parecordController.createPArecord);
router.get('/getparecords', parecordController.getPArecords);


module.exports = router;
