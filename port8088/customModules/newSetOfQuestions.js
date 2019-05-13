const newSetOfQuestions = async (importantFunctions, userName, client, questionData, cprivate, userId, wrongCounter, messages, score, res) => {
    if (score[userId] == 100) {
        const time_epoch = await importantFunctions.getTimeEpoch(userId, client)
        const timeEpochAtTheMoment = (new Date).getTime();
        //3600000 is 1 hour in epoch format
        if (time_epoch == null ||	(timeEpochAtTheMoment - time_epoch) > 3600000) {
          await importantFunctions.putDataInTableIfNewUser(userId, userName, client)
          await importantFunctions.updateQuestionsIDinDatabase(userId, client)
          await importantFunctions.updateTimeEpochinDatabase(userId, client)
          const getQuestionsIdInDatabase = await importantFunctions.getQuestionsIdInDatabase(userId, client)
          questionData[userId] = await importantFunctions.processRawQuestionsToDesiredFormat(getQuestionsIdInDatabase)
          //console.log(questionData[userId])
        
          for (var i = 0; i < questionData[userId].length; i++) {
          questionData[userId][i].answers = importantFunctions.shuffle(questionData[userId][i].answers);
          }
        
          importantFunctions.shuffle(questionData[userId])
        
          cprivate[userId]={};
          cprivate[userId].counter=0;
          cprivate[userId].arr=[];
          wrongCounter[userId] = []  
      
          //fill the question array with blanks
        
          for (var i = 0; i < questionData[userId].length; i++) cprivate[userId].arr.push("blank");
          let modelQuestion = messages.startFromTheBeginning(cprivate, userId, questionData);
          //send response
            res.send(modelQuestion);
        }
    
        else {
        let modelQuestion = messages.waitUntilTomorrow
        res.send(modelQuestion)
        }
    
    }
    
    else if (score[userId] < 100) {
        let modelQuestion = messages.tryAgainUntil100
        res.send(modelQuestion)
    }
}

module.exports.newSetOfQuestions = newSetOfQuestions