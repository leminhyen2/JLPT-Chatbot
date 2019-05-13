const correct = async (importantFunctions, userName, client, questionData, cprivate, userId, wrongCounter, messages, score, res) => {
    wrongCounter[userId] = []
    console.log(wrongCounter[userId])
  
    if (cprivate[userId].arr[cprivate[userId].counter]=="blank") cprivate[userId].arr[cprivate[userId].counter] = "correct";
    cprivate[userId].counter++;
  
    if (questionData[userId][cprivate[userId].counter]!=undefined) {
      let modelQuestion = messages.ifQuestionDataExist(cprivate, userId, questionData);
      res.send(modelQuestion);
    } 
  
    else {
      //set score
      let correctAnswers = importantFunctions.getCorrectAmount(cprivate[userId].arr);
      score[userId] = (correctAnswers/questionData[userId].length)*100;
      console.log("Score: " + score[userId]);
  
      ////test complete, reset counter
      cprivate[userId].counter = 0;
      cprivate[userId].correct = 0;
      cprivate[userId].incorrect = 0;
      
      //construct request
      const totalWordsSoFar = await importantFunctions.getQuestionId(userId, client)
      const userWithHigherRanking = await importantFunctions.getUserWithHigherRanking(userId, client)
      const userWithLowerRanking = await importantFunctions.getUserWithLowerRanking(userId, client)
      const userRanking = await importantFunctions.getUserRanking(userId, client)
      let modelQuestion = messages.achievement(totalWordsSoFar, userWithHigherRanking, userWithLowerRanking, userRanking);
      res.send(modelQuestion);
    }
  
}

module.exports.correct = correct