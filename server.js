const express = require('express')
const cors = require('cors')
const request = require('request')
const dotenv = require('dotenv')
const app = express()
const path = require('path')

// PORT
const PORT = process.env.PORT || 3001;

// set cors
app.use(cors())

// dotenv config
dotenv.config();

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })

}


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
        clientId: "8a7aeeb3317a60bd5f99313a2cf3d2de",
        clientSecret: "c3001129c6a6a128cd48274839354bfd85a3e1a8bad941c8adbc10a6bdb813c1"
    };

    request({
        url: "https://api.jdoodle.com/v1/execute",
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

app.listen(PORT, console.log("Listening on 3001"));