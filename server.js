const express = require('express')
const cors = require('cors')
const request = require('request')
const dotenv = require('dotenv')
const app = express()

// set cors
app.use(cors())

// dotenv config
dotenv.config();

app.use(express.json())

// bodyParser
app.use(express.urlencoded({ extended: true }))

app.post('/exec', (req, res) => {

    console.log(req.body.user.script)

    let program = {
        script: req.body.user.script,
        language: req.body.user.language,
        stdin: req.body.user.stdin,
        versionIndex: "3",
        clientId: process.env.ID,
        clientSecret: process.env.SECRET
    };

    request({
        url: process.env.API_URL,
        method: "POST",
        json: program
    },
        function (error, response, body) {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log(body)
            res.json(body)
        });
})

app.listen(3001, console.log("Listening on 3001"));