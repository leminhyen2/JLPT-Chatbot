module.exports.tryAgain = {
  'messages': [
    {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'button',
          'text': `A new update may just happened. Would you like to try again?`,
          'buttons': [
            {
              'type': 'show_block',
              'block_names': ['button_generic'],
              'title': `Get Questions`
            }
          ]
        }
      }
    }
  ]
}

module.exports.tryAgainUntil100 = {
  'messages': [
    {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'button',
          'text': `Please get 100% with NO wrong answers to access a new set of question`,
          'buttons': [
            {
              'type': 'show_block',
              'block_names': ['button_generic'],
              'title': `Get Questions`
            }
          ]
        }
      }
    }
  ]
}

module.exports.warning = {
  'messages': [
    {
      'text': 'Incorrect, please try again!'
    }
  ]
}

module.exports.newSetOfQuestions = {
  'messages': [
    {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'button',
          'text': `A new set of questions for todays has been made available, please click 'Get Questions' to try it`,
          'buttons': [
            {
              'type': 'show_block',
              'block_names': ['button_generic'],
              'title': `Get Questions`
            }
          ]
        }
      }
    }
  ]
}

module.exports.skipOrContinue = {
  'messages': [
    {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'button',
          'text': `If the question is too hard or there was a technical error, you can either skip the question or continue to do it`,
          'buttons': [
            {
              'type': 'show_block',
              'block_names': ['button_generic'],
              'title': `Skip`
            },
            {
              'type': 'show_block',
              'block_names': ['button_generic'],
              'title': `Continue`
            }
          ]
        }
      }
    }
  ]
}

module.exports.waitTillNextBoardcast = {
  'messages': [
    {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'button',
          'text': `Please wait until the next boardcast arrive`,
          'buttons': [
            {
              'type': 'show_block',
              'block_names': ['button_generic'],
              'title': `Get Questions`
            }
          ]
        }
      }
    }
  ]
}

module.exports.waitUntilTomorrow = {
  'messages': [
    {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'button',
          'text': `You have reach the limit of new questions for today, please wait until tomorrow for a new set of questions`,
          'buttons': [
            {
              'type': 'show_block',
              'block_names': ['button_generic'],
              'title': `Get Questions`
            }
          ]
        }
      }
    }
  ]
}

module.exports.randomizedQuestions = {
  'messages': [
    {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'button',
          'text': `Questions had been randomized, please click 'Get Questions' to try them`,
          'buttons': [
            {
              'type': 'show_block',
              'block_names': ['button_generic'],
              'title': `Get Questions`
            }
          ]
        }
      }
    }
  ]
}


module.exports.webViewURL = function webViewURL (userId) {
  const message = {
    "messages": [
    {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          'text': `Please select your options.`,
          "buttons": [
            {
              "type": "web_url",
              "url": "https://bot7.1zero.today/setting",
              "title": "Check Ranking"
            },
            {
              "type": "show_block",
              "block_names": ["Reminder Frequency"],
              "title": "Reminder Frequency"
            },
          ]
        }
      }
    }
  ]
 }
  return message
}


module.exports.getScore = function getScore (score) {
  const message = {
    'messages': [
      {
        'attachment': {
          'type': 'template',
          'payload': {
            'template_type': 'generic',
            'elements': [
              {
                'title': `You won! Your score is ${Math.round(score)}%!`,
                'subtitle': `Hit "Get Questions" to get the same set of questions in random order!`,
                'buttons': [
                  {
                    'type': 'show_block',
                    'block_names': ['button_generic'],
                    'title': `New Set of Questions`
                  },
                  {
                    'type': 'show_block',
                    'block_names': ['button_generic'],
                    'title': `Get Questions`
                  }
                ]
              }
            ]
          }
        }
      }
    ]
  }
  return message
}

module.exports.achievement = function achievement(totalWordsSoFar, userWithHigherRanking, userWithLowerRanking, userRanking) {
  const message =  {
  "messages":[
    {
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"generic",
          "elements":[
            {
              "title":`Congratulation! you are ranked at ${userRanking} and you have learned ${totalWordsSoFar} words so far`,
              "subtitle":`${userWithHigherRanking}`,
              "buttons":[
              {
                "type": "show_block",
                "block_names": ["button_generic"],
                "title": `New Set of Questions`
              },
              {
                "type": "show_block",
                "block_names": ["button_generic"],
                "title": `Get Questions`
              },
              {
                'type': 'show_block',
                'block_names': ["button_generic"],
                'title': `Setting`
              }
              ]
            }
          ]
        }
      }
    }
  ]
  }
  
return message
}

module.exports.ifQuestionDataExist = function ifQuestionDataExist (cprivate, userId, questionData) {
  const message = {
    'messages': [
      {
        'attachment': {
          'type': 'template',
          'payload': {
            'template_type': 'button',
            'text': `${cprivate[userId].counter + 1}/${questionData[userId].length}. ${questionData[userId][cprivate[userId].counter].question}`,
            'buttons': [
              {
                'type': 'show_block',
                'block_names': ['button_generic'],
                'title': `${questionData[userId][cprivate[userId].counter].answers[0].text}`
              },
              {
                'type': 'show_block',
                'block_names': ['button_generic'],
                'title': `${questionData[userId][cprivate[userId].counter].answers[1].text}`
              },
              {
                'type': 'show_block',
                'block_names': ['button_generic'],
                'title': `${questionData[userId][cprivate[userId].counter].answers[2].text}`
              }
            ]
          }
        }
      }
    ]
  }

  return message
}

module.exports.startFromTheBeginning = function startFromTheBeginning (cprivate, userId, questionData) {
  const message = {
    'messages': [
      {
        'attachment': {
          'type': 'template',
          'payload': {
            'template_type': 'button',
            'text': `${cprivate[userId].counter + 1}/${questionData[userId].length}. ${questionData[userId][0].question}`,
            'buttons': [
              {
                'type': 'show_block',
                'block_names': ['button_generic'],
                'title': `${questionData[userId][0].answers[0].text}`
              },
              {
                'type': 'show_block',
                'block_names': ['button_generic'],
                'title': `${questionData[userId][0].answers[1].text}`
              },
              {
                'type': 'show_block',
                'block_names': ['button_generic'],
                'title': `${questionData[userId][0].answers[2].text}`
              }
            ]
          }
        }
      }
    ]
  }

  return message
}
