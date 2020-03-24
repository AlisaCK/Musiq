const SimulatedDB = require('../_helpers/dbsimulator');

module.exports = {
    getAllPArecords,
    addPArecord,
    deletePArecord
}

async function getAllPArecords() {
    return await SimulatedDB.getAllPArecords();
}

async function deletePArecord(date, username) {
    console.log('username: ' + username + ' date: ' + date);
    console.log(await SimulatedDB.findPArecord(username, date))

    if(!await SimulatedDB.findPArecord(username, date)){
        throw 'A PARecord on date "' + date + '" cannot be found "' + username + '"';
    }

    return await SimulatedDB.deletePArecord(date, username)
}

async function addPArecord(parecord) {
    if(await SimulatedDB.findPArecord(parecord.createdBy, parecord.createdDate)){
        throw 'A PARecord on date "' + parecord.createdDate + '" is already created by "' + parecord.createdBy + '"';
    }

    return await SimulatedDB.addPArecord(parecord)
}
