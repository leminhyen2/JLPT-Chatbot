module.exports.shuffle = function shuffle (array) {
  let counters = array.length
  while (counters > 0) {
    let index = Math.floor(Math.random() * counters)
    counters--
    let temp = array[counters]
    array[counters] = array[index]
    array[index] = temp
  }
  return array
}

module.exports.findCorrect = function findCorrect (item) {
  if (item.answers[0].correct) { return item.answers[0].text } else if (item.answers[1].correct) { return item.answers[1].text } else if (item.answers[2].correct) { return item.answers[2].text }
}

module.exports.getCorrectAmount = function getCorrectAmount (arr) {
  var amt = 0
  for (var i = 0; i < arr.length; i++) if (arr[i] === 'correct') amt++
  return amt
}

module.exports.putDataInTableIfNewUser = function putDataInTableIfNewUser (userId, userName, client) {
  const query1 = `SELECT * FROM freeuserinfo
    WHERE userid = '${userId}'`

  const query2 = `INSERT INTO freeuserinfo (userid, username, questionid)
    VALUES ('${userId}', '${userName}', 1)`

  client.query(query1, (err, res) => {
    if (err) { console.log(JSON.stringify(err, null, 2)) } else if (res.rows.length === 0) {
      client.query(query2, (err, res) => {
        if (err) { console.log(JSON.stringify(err, null, 2)) }
      })
    }
  })
}

module.exports.getQuestionsIdInDatabase = async function getQuestionsIdInDatabase (userId, client) {
  const query1 = `SELECT vocablist.question, vocablist.answer FROM vocablist AS vocablist
    INNER JOIN freeuserinfo AS freeuserinfo
    ON vocablist.id BETWEEN freeuserinfo.questionid AND freeuserinfo.questionid + 2
    WHERE freeuserinfo.userid = '${userId}'`

  const query2 = `UPDATE freeuserinfo 
    SET questionid = 1
    WHERE userid = '${userId}'`

  const result = async () => {
    return new Promise(function (resolve, reject) {
      client.query(query1, (err, res) => {
        if (err) { console.log(JSON.stringify(err, null, 2)) } else if (res.rows.length === 0) {
          client.query(query2, (err, res) => {
            if (err) { console.log(JSON.stringify(err, null, 2)) }
          })
          client.query(query1, (err, res) => {
            if (err) { console.log(JSON.stringify(err, null, 2)) } else { resolve(res.rows) }
          })
        } else {
          resolve(res.rows)
        }
      })
    })
  }
  return result()
}

module.exports.updateQuestionsIDinDatabase = async function updateQuestionsIDinDatabase (userId, client) {
  const query1 = `UPDATE freeuserinfo SET 
    questionid = questionid + 3
    WHERE userid = '${userId}';`

  client.query(query1, (err, res) => {
    if (err) { console.log(JSON.stringify(err, null, 2)) } else {
    }
  })
}

module.exports.get10QuestionsIdInDatabase = async function get10QuestionsIdInDatabase (userId, client) {
  const query1 = `SELECT vocablist.question, vocablist.answer FROM vocablist AS vocablist
    INNER JOIN freeuserinfo AS freeuserinfo
    ON vocablist.id BETWEEN freeuserinfo.questionid - 3 AND freeuserinfo.questionid + 2
    WHERE freeuserinfo.userid = '${userId}'`

  const query2 = `UPDATE freeuserinfo 
    SET questionid = 1
    WHERE userid = '${userId}'`

  const result = async () => {
    return new Promise(function (resolve, reject) {
      client.query(query1, (err, res) => {
        if (err) { console.log(JSON.stringify(err, null, 2)) } else if (res.rows.length === 0) {
          client.query(query2, (err, res) => {
            if (err) { console.log(JSON.stringify(err, null, 2)) }
          })
          client.query(query1, (err, res) => {
            if (err) { console.log(JSON.stringify(err, null, 2)) } else { resolve(res.rows) }
          })
        } else {
          resolve(res.rows)
        }
      })
    })
  }
  return result()
}

module.exports.update10QuestionsIDinDatabase = async function update10QuestionsIDinDatabase (userId, client) {
  const query1 = `UPDATE freeuserinfo SET 
    questionid = questionid + 6
    WHERE userid = '${userId}';`

  client.query(query1, (err, res) => {
    if (err) { console.log(JSON.stringify(err, null, 2)) } else {
    }
  })
}

module.exports.processRawQuestionsToDesiredFormat = async function processRawQuestionsToDesiredFormat (getQuestionsIdInDatabase) {
  const arrayOfQuestions = await getQuestionsIdInDatabase

  const questionAndAnswer = () => {
    return new Promise(function (resolve, reject) {
      let completeSetOfQuestions = []
      for (let i = 0; i < arrayOfQuestions.length; i++) {
        let arrayWithoutCurrentValue = arrayOfQuestions.filter((x) => x.answer !== arrayOfQuestions[i].answer).map((x) => x.answer)
        let wrongAnswer1 = arrayWithoutCurrentValue[Math.floor(Math.random() * arrayWithoutCurrentValue.length)]
        let arrayOfNoWrongAnswer1 = arrayWithoutCurrentValue.filter((x) => x !== wrongAnswer1)
        let wrongAnswer2 = arrayOfNoWrongAnswer1[Math.floor(Math.random() * arrayOfNoWrongAnswer1.length)]
        completeSetOfQuestions.push({ 'question': arrayOfQuestions[i].question, 'answers': [] })
        completeSetOfQuestions[i].answers.push({ 'text': arrayOfQuestions[i].answer, 'correct': true }, { 'text': wrongAnswer1, 'correct': false }, { 'text': wrongAnswer2, 'correct': false })
      }
      resolve(completeSetOfQuestions)
    })
  }
  return questionAndAnswer()
}

module.exports.getQuestionId = async function getQuestionId (userId, client) {
  const query1 = `SELECT questionid
    FROM freeuserinfo
    WHERE userid = '${userId}'`

  const result = async () => {
    return new Promise(function (resolve, reject) {
      client.query(query1, (err, res) => {
        if (err) { console.log(JSON.stringify(err, null, 2)) } else {
          resolve(res.rows[0].questionid + 4)
        }
      })
    })
  }
  return result()
}

module.exports.updateTimeEpochinDatabase = async function updateTimeEpochinDatabase (userId, client) {
  var milliseconds = (new Date()).getTime()

  const query1 = `UPDATE freeuserinfo SET 
    time_epoch = '${milliseconds}'
    WHERE userid = '${userId}';`

  client.query(query1, (err, res) => {
    if (err) { console.log(JSON.stringify(err, null, 2)) } else {
    }
  })
}

module.exports.getTimeEpoch = async function getTimeEpoch (userId, client) {
  const query1 = `SELECT time_epoch
    FROM freeuserinfo
    WHERE userid = '${userId}'`

  const result = async () => {
    return new Promise(function (resolve, reject) {
      client.query(query1, (err, res) => {
        if (err) { console.log(JSON.stringify(err, null, 2)) } else {
          resolve(res.rows[0].time_epoch)
        }
      })
    })
  }
  return result()
}

module.exports.getUserWithLowerRanking = async function getUserWithLowerRanking(userId, client) {

  const query1 = `SELECT * FROM freeuserinfo
  WHERE questionid < (SELECT questionid FROM freeuserinfo WHERE userid = '${userId}')
  ORDER BY questionid DESC
  LIMIT 1`

  const result = async () => {
      return new Promise(function(resolve, reject) {
          client.query(query1, (err, res) => {
              if (err) {console.log(JSON.stringify(err, null, 2))}
              
              else if (res.rows.length === 0) {
                  resolve(`There are no users behind you`)
              }

              else {
                  resolve(`Following user: ${res.rows[0].questionid + 4} words`)
              }
            })
      })

  }

  return result()
}

module.exports.getUserWithHigherRanking = async function getUserWithHigherRanking(userId, client) {

  const query1 = `SELECT * FROM freeuserinfo
  WHERE questionid > (SELECT questionid FROM freeuserinfo WHERE userid = '${userId}')
  ORDER BY questionid ASC
  LIMIT 1`

  const result = async () => {
      return new Promise(function(resolve, reject) {
          client.query(query1, (err, res) => {
              if (err) {console.log(JSON.stringify(err, null, 2))}
              
              else if (res.rows.length === 0) {
                  resolve(`You are the highest ranking user`)
              }

              else {
                  resolve(`Leading user: ${res.rows[0].username} ${res.rows[0].questionid + 4} words`)
              }
            })
      })

  }

  return result()
}

module.exports.getUserRanking = async function getUserRanking(userId, client) {

  const query1 = `SELECT ranking 
  FROM (
  SELECT freeuserinfo.*,
  row_number() OVER (ORDER BY questionid DESC) AS ranking
  FROM freeuserinfo
  ) sametablebutwithranking
  WHERE userid = '${userId}'`

  const result = async () => {
      return new Promise(function(resolve, reject) {
          client.query(query1, (err, res) => {
              if (err) {console.log(JSON.stringify(err, null, 2))}

              else {
                  resolve(`${res.rows[0].ranking}`)
              }
            })
      })

  }

  return result()
}

module.exports.getAllUserRanking = async function getAllUserRanking(client) {
  const query1 = `
  SELECT freeuserinfo.username AS users, freeuserinfo.questionid + 2 AS questions,
  row_number() OVER (ORDER BY questionid DESC) AS ranking
  FROM freeuserinfo
  `
  
  const result = async () => {
        return new Promise(function (resolve, reject) {
          client.query(query1, (err, res) => {
            if (err) { console.log(JSON.stringify(err, null, 2)) } else {
              resolve(res.rows)
            }
          })
        })
      }

  return result()
}