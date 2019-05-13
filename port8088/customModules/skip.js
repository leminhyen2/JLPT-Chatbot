const skip = async (importantFunctions, userName, client, questionData, cprivate, userId, wrongCounter, messages, res) => {
    wrongCounter[userId] = []
    console.log(wrongCounter[userId])
    if (cprivate[userId].arr[cprivate[userId].counter]=="blank") cprivate[userId].arr[cprivate[userId].counter] = "incorrect";
    cprivate[userId].counter++;
  
    if (questionData[userId][cprivate[userId].counter]!= undefined) {
      let modelQuestion = messages.ifQuestionDataExist(cprivate, userId, questionData);
      res.send(modelQuestion);
    } 
  
    else {
      //set score
      let correctAnswers = importantFunctions.getCorrectAmount(cprivate[userId].arr);
      let score = (correctAnswers/questionData[userId].length)*100;
      let modelQuestion = messages.getScore(score);
  
      
      ////test complete, reset counter
      cprivate[userId].counter = 0;
      cprivate[userId].correct = 0;
      cprivate[userId].incorrect = 0;
  
      //construct request
      //send request
      res.send(modelQuestion);
    }

}

module.exports.skip = skip