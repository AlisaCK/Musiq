const parecordService = require('../services/parecord.service')

module.exports = {
    createPArecord,
    getPArecords,
    deletePArecord
};

async function createPArecord(req, res, next) {
    console.log("CREATING PA RECORD IN CONTROLLER")

    parecordService.addPArecord(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

async function getPArecords(req,res,next){
    parecordService.getAllPArecords()
        .then(users => res.json(users))
        .catch(err => next(err));
}

async function deletePArecord(req,res,next){
    parecordService.deletePArecord(req.params.date, req.user.sub)
        .then(users => res.json(users))
        .catch(err => next(err));
}
