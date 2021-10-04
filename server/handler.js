var mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

//database connection
var dbconn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database: 'userdb'
});

dbconn.connect((error) =>{
    if(error){
        throw error;
      }
      console.log('Database connection successful');
});

let numberUser = 6;
if(process.argv[2]){// pass argument to query
    numberUser = process.argv[2];
}


let selectQuery = `SELECT username FROM user LIMIT 0,`+numberUser;

//setup web server
const app = express();
app.listen(8000, ()=>{
    console.log("Server started ...");
});

app.get("/api/users",(req, res)=>{
    dbconn.query(selectQuery,(error, results,fields)=>{
                    if(error){
                        return console.error(error.message);
                    }
                    //console.log(results);
                    let users = [];
                    let highestScore = 0;
                    var highestScoreUser;
                    results.forEach(element => {
                        const score = generateRandomNumber(0,100);
                        let newuser = new User(score, element['username']);
                        if(highestScore <= score){
                            // console.log('highestScore ='+highestScore);
                            // console.log('score ='+score);
                            highestScore = score;
                            highestScoreUser = newuser;
                        }
                        users.push(newuser);
                        //console.log(element['username'] + ' '+score);
                        
                    });
                    highestScoreUser.highestScore = true;
                    console.log(users);
                    res.send(200,{msg: "Data fetched successfully", data: users})
                });
})

//utilities
/*
Generate a random number in the range [min,max]
*/
function generateRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class User{
    constructor(number,username,highestScore = false){
        this.number = number;
        this.username = username;
        this.highestScore = highestScore;//maybe should move the part of checking highest score to vue client.
    }
}