const notCorrect = async (importantFunctions, userName, client, questionData, cprivate, userId, wrongCounter, messages, score, res) => {
    wrongCounter[userId].push("wrong")   
    console.log(wrongCounter[userId]) 
    if (wrongCounter[userId].length == 3) {
      if (cprivate[userId].arr[cprivate[userId].counter]=="blank") cprivate[userId].arr[cprivate[userId].counter] = "incorrect";
      wrongCounter[userId] = []
      let modelQuestion = messages.skipOrContinue;
      res.send(modelQuestion);
    }
    else {
      if (cprivate[userId].arr[cprivate[userId].counter]=="blank") cprivate[userId].arr[cprivate[userId].counter] = "incorrect";
      let modelQuestion = messages.warning;
      res.send(modelQuestion);
    }
}

module.exports.notCorrect = notCorrect