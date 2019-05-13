# JLPT-Chatbot

# Website: https://www.facebook.com/JLPT-Chatbot-312860232799615/

# Architecture: 
Digital Ocean + Ubuntu + SSH + NGINX + PostgreSQL + JavaScript/NodeJs + Chatfuel (connects with Facebook API) 

# File Structure:

- 8088mainFile.js: this file host the chatbot interface code. Like its name implied, it is served on port 8088

- importantFunctions.js: this file contains mainly functions that fetch data from database and push it to 8088mainFile.js

- messages.js: contains messages in the required format that are used by 8088mainFile to be sent to Chatfuel to process 

