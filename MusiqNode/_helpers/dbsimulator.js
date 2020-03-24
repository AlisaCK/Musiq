module.exports = {
    findUser,
    addUser,
    findPArecord,
    addPArecord,
    getAllUsers,
    getAllPArecords,
    deletePArecord
    }




let Users = [{
    username: "admin",
    role: "Admin",
   password:"123123"},
    {username: "user",
        role: "User",
        password:"123123"}

];

let PARecords = [

]

async function findPArecord(username, date){

    return new Promise((resolve) => {
        let index = -1
        for (let i = 0; i < PARecords.length; i++) {
            if (PARecords[i].createdBy === username && PARecords[i].createdDate === date) {
                index = i;
            }
        }
        if (index != -1) {
            setTimeout(() => {
                resolve(PARecords[index]);
            }, 10);
        }
        else {
            resolve(null);
        }
    });
}

async function findUser(username){

    return new Promise((resolve) => {
        const index = Users.map(user => user.username).indexOf(username);
        console.log("Find user", index);
        if (index!=-1) {
            setTimeout(()=>{
                resolve(Users[index]);
                },10);
        }
        else
            resolve(null);
    });
}

async function getAllUsers(){
    return new Promise((resolve, reject) => {
        if (Users.length>0) {
            setTimeout(()=>{
                resolve(Users);
            },10);
        }
        else
            reject(false);
    });
}

async function addUser(user){

    console.log("DB: AddUser()", user);
    return new Promise((resolve, reject) => {

        if (user.username && user.role) {
            setTimeout(()=>{

                Users.push(user);
                resolve(user);
            },10)
        }
        else
            reject(false);
    });
}

async function addPArecord(parecord){
    console.log("DB: PARecord()", parecord);

    return new Promise((resolve, reject) => {
        if (parecord.calories && parecord.caloriegoal && parecord.minutes && parecord.minutegoal
            && parecord.steps && parecord.activityType >= 0 && parecord.createdDate
            && parecord.createdBy) {
            setTimeout(()=>{
                PARecords.push(parecord);
                resolve(parecord);
            },10)
        }
        else
            reject(false);
    });

}

async function getAllPArecords(){
    return new Promise((resolve, reject) => {
        if (PARecords.length>=0) {
            setTimeout(()=>{
                resolve(PARecords);
            },10);
        }
        else
            reject(false);
    });
}

//prereq: the parecord to delete exists
async function deletePArecord(date, username){
    return new Promise((resolve, reject) => {
        let index = 0
        for (var i = 0; i < PARecords.length; i++) {
            console.log(PARecords[i].createdBy + "asdf" + PARecords[i].createdDate)
            if (PARecords[i].createdBy === username && PARecords[i].createdDate === date) {
                index = i;
            }
        }
        while (index < PARecords.length - 1){
            PARecords[index] = PARecords[index+1]
            index++
        }
        PARecords.pop()
        if (PARecords.length>=0) {
            setTimeout(()=>{
                resolve(PARecords);
            },10);
        }
        else{
            reject(false);
        }
    });
}
