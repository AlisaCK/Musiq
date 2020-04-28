const db = require('../_helpers/database');
const PArecord = db.PArecord;
const User = db.User;


module.exports = {
    getAllPArecords,
   addPArecord,
   deletePArecord
}


//TODO: write the necessary functions that will address the needs of parecord.controller. Hint: look at the signatures in the module.exports. Hint2: look at user.service to see how you can interact with the database. Hint3: look at the class material.




async function addPArecord(parecord, userID) {

    var username;
    var cursor = await User.findOne({_id: userID});
    // console.log(JSON.stringify(cursor));
    // // cursor.each(function(err, us){
    // //     if(us != null){
    username = cursor.username;
    // //     }
    // // });
    // username = cursor.username;
    console.log("wow");
    console.log(username);
    // validate
    if (await PArecord.findOne({ createdBy: userID, createdDate: parecord.createdDate  })) {
        throw 'Parecord created by"' + username +" on "+ parecord.createdDate +'" already exists';
    }
    else if(!userID){
        throw 'Error with the user submitting the request. User information missing. Malformed request.';
    }
    //populate missing fields in the parecord object
    let newrecord= parecord;
    parecord.createdBy = userID;
    parecord.createdDate =  new Date();

    dbrecord = new PArecord(newrecord);


    // save the record
    await dbrecord.save();
    return "recorded!";
}


async function getAllPArecords() {
    //Returning the result of the promise.
    return await PArecord.find().select('-hash').populate("createdBy");
}

async function deletePArecord(date, userid){
    if (await PArecord.findOne({ createdBy: userid, createdDate: date  })) {
        await PArecord.deleteOne({ createdDate: date }, function (err) {
            if (err) return handleError(err);
            // deleted at most one tank document
        });
        return 'Deleted 1';
    }
    else if(!userid){
        throw 'Error with the user submitting the request. User information missing. Malformed request.';
    }
    else if(await PArecord.findOne({ createdDate: date  })){
        throw 'Deleted 0';
    }

    // save the record

}
