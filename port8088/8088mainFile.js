//'use strict';

//nodeJS modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { Client } = require('pg');
const cors = require('cors');
require('dotenv').config() //environment variable

//custom modules
const importantFunctions = require('./importantFunctions.js') //long functions are abstracted here
const messages = require('./messages.js') //messages sent to chatfuel
const getQuestions = require('./customModules/getQuestions.js') 
const questionsForToday = require('./customModules/questionsForToday.js') 
const doubleSaturday = require('./customModules/doubleSaturday.js') 
const skip = require('./customModules/skip.js') 
const newSetOfQuestions = require('./customModules/newSetOfQuestions.js') 
const notCorrect = require('./customModules/notCorrect.js') 
const correct = require('./customModules/correct.js') 

//global variable
var cprivate = {};
var wrongCounter = {};
var questionData = {};
var score = {}

//connect with database
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: true
});
client.connect();

//extend express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

//set the business logic code 
app.post('/', async function (req, res) {

    const body = req.body;
    const userId = body['messenger user id']
    const userName = `${body['first name']} ${body['last name']}`
    //console.log(body) to check if received info from server

if (body["last clicked button name"] == "Get Questions") {
  getQuestions.getQuestions(importantFunctions, userName, client, questionData, cprivate, userId, wrongCounter, messages, res)
}
else if (body["last clicked button name"] == "Questions For Today") {
  questionsForToday.questionsForToday(importantFunctions, userName, client, questionData, cprivate, userId, wrongCounter, messages, res)
}
else if (body["last clicked button name"] == "Double Saturday") {
  doubleSaturday.doubleSaturday(importantFunctions, userName, client, questionData, cprivate, userId, wrongCounter, messages, res)
}
else if (body["last clicked button name"] == "Skip") {
  skip.skip(importantFunctions, userName, client, questionData, cprivate, userId, wrongCounter, messages, res)
}
else if (body["last clicked button name"] == "Continue") {
  wrongCounter[userId] = []
  let modelQuestion = messages.ifQuestionDataExist(cprivate, userId, questionData);
  res.send(modelQuestion);
}
else if (body["last clicked button name"] == "Setting") {
  let message = messages.webViewURL(userId);
  res.send(message)
}
else if (body["last clicked button name"] == "New Set of Questions") {
  newSetOfQuestions.newSetOfQuestions(importantFunctions, userName, client, questionData, cprivate, userId, wrongCounter, messages, score, res)
}
else if (body["last clicked button name"] != importantFunctions.findCorrect(questionData[userId][cprivate[userId].counter])) {
  notCorrect.notCorrect(importantFunctions, userName, client, questionData, cprivate, userId, wrongCounter, messages, score, res)
}
else if (body["last clicked button name"] == importantFunctions.findCorrect(questionData[userId][cprivate[userId].counter])) {
  correct.correct(importantFunctions, userName, client, questionData, cprivate, userId, wrongCounter, messages, score, res)
}

//check if the answer was asked before the bot was restarted
else if (cprivate[userId]==undefined) {
  let modelQuestion  = messages.tryAgain;
  res.send(modelQuestion);
  return;
}

});

//if click setting button, display user ranking
app.get('/setting', async function (req, res) {
  res.sendFile( __dirname +  "/allUserRanking.html" );
})

//check if server is working or not https://bot7.1zero.today/alluserinfo
app.get('/alluserinfo', async function (req, res) {
  const result = await importantFunctions.getAllUserRanking(client)
  res.send(result)
})

//set the port 
app.listen(8088, function (err) {
  if (err) {
    throw err;
  }

  console.log('Server started on port 8088');
});

