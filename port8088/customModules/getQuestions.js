const getQuestions = async (importantFunctions, userName, client, questionData, cprivate, userId, wrongCounter, messages, res) => {
    await importantFunctions.putDataInTableIfNewUser(userId, userName, client)

    const getQuestionsIdInDatabase = await importantFunctions.getQuestionsIdInDatabase(userId, client)
    questionData[userId] = await importantFunctions.processRawQuestionsToDesiredFormat(getQuestionsIdInDatabase)
  
    for (var i = 0; i < questionData[userId].length; i++) {
    questionData[userId][i].answers = importantFunctions.shuffle(questionData[userId][i].answers);
    }
  
    importantFunctions.shuffle(questionData[userId])
  
    cprivate[userId] = {};
    cprivate[userId].counter = 0;
    cprivate[userId].arr = [];
    wrongCounter[userId] = []
  
   // importantFunctions.shuffle(questionData)
    //console.log(questionData)
  
    //fill the question array with blanks
    for (var i = 0; i < questionData[userId].length; i++) cprivate[userId].arr.push("blank");
      let modelQuestion = messages.startFromTheBeginning(cprivate, userId, questionData);
      //send response
      res.send(modelQuestion);
}

module.exports.getQuestions = getQuestions