require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3')
const config = require('./toneConfig')
const {SERVER_PORT} = process.env
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


const text = `President Trump lashed out at Attorney General Jeff Sessions in a string of tweets on Monday, accusing him of hurting Republican chances in the upcoming midterm elections with a series of Justice Department investigations.

“Two long running, Obama era, investigations of two very popular Republican Congressmen were brought to a well publicized charge, just ahead of the Mid-Terms, by the Jeff Sessions Justice Department,” Trump tweeted. “Two easy wins now in doubt because there is not enough time. Good job Jeff.....”`

const input = {'text': text}


const params = 
  {
    'tone_input':input,
    'content_type': 'application/json'
  }

const tone_analyzer = new ToneAnalyzerV3(
  {
    username:config.username,
    password:config.password,
    url:config.url,
    version_date: '2017-09-21'
  })
let data = []
tone_analyzer.tone(params, function(err,res){
  if(err){
    console.log('Error:', err);
  }else{
    data.push(res)
    console.log(data)
    app.get('/api/getdata', (req,res)=>{
      res.send(data)
    })
  }
})


app.listen(SERVER_PORT, ()=>{
  console.log(`Listening On port : ${SERVER_PORT}`)
})