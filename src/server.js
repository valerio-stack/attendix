require('dotenv').config()
const { rejects } = require('assert')
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const http = require('http')
const { error } = require('console')

const app = express()
const server = http.createServer(app)
server.listen(3000)

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(express.text())


/* sign up / sign in stuff --------------------------------------- */

app.post('/postSignUpDatas', (req, res) => {
    fs.readFile('C:/Users/lisa/Downloads/attendix_database/users.json', "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send({showError: true, message: "Server error! Try again later!"})
        }


        let isUserSignedUpMap = 
            JSON.parse(data).map((user) => {
                if (Object.values(user).includes(req.body.email)) { return true} 
                else { return  false }
            })
        let userAlreadySignedUp = isUserSignedUpMap.includes(true)
        
        if (!userAlreadySignedUp) {
            let newData = JSON.parse(data)
            newData.push(req.body)
            fs.writeFile('C:/Users/lisa/Downloads/attendix_database/users.json', JSON.stringify(newData), err => (err) && console.log(err))

            let token = jwt.sign({fullname: req.body.fullname},process.env.SECRET_KEY, {expiresIn: "7d"})
            res.cookie('userDatas', token, {expires: new Date(Date.now() +  5 * 24 * 60 * 60 * 1000), path:'/', httpOnly: true})
        }
        else { res.send({showError: true, message: "Your email has already been used!"}) }
    })
})


app.post('/postSignInDatas', (req, res) => {
    fs.readFile('C:/Users/lisa/Downloads/attendix_database/users.json', "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send({showError: true, message: "Server error! Try again later!"})
        }

        let isUserSignedInMap = 
            JSON.parse(data).map((user) => {
                let valuesInJSON = Object.values(user).join(',')
                let inputtedValues = `${req.body.fullname},${req.body.email},${req.body.password}`
                let inputtedDatasMatch = (valuesInJSON == inputtedValues)

                if (inputtedDatasMatch) { return true } 
                else { return false }
            })
        let userSignedIn = isUserSignedInMap.includes(true)
        
        if (userSignedIn) {
            let token = jwt.sign({fullname: req.body.fullname}, process.env.SECRET_KEY, {expiresIn: "7d"})
            res.cookie('userDatas', token, {expires: new Date(Date.now() +  5 * 24 * 60 * 60 * 1000), path:'/', httpOnly: true})
            res.send({showError: false, message: "User successfully signed in!"})
        }
        else { res.send({showError: true, message: "User doesn't exist!"}) }
    })
})


app.get('/getUserDatas', (req, res) => {
    try {
        let parsedCookie = req.headers.cookie.split('=')[1]
        res.send(jwt.verify(parsedCookie, process.env.SECRET_KEY))
    } catch(error) {
        console.log(error)
    }
})


/* socket io stuff ------------------------------------------------ */

const io = require("socket.io")(server, {
    cors: {
        'origin': '*'
    }
})

io.on('connection', (socket) => {
    socket.emit('sendSocketId', socket.id)

    socket.on('sendCookiesWithId', (cookies, id) => {
        let fullname = JSON.parse(cookies).fullname
        fs.readFile('C:/Users/lisa/Downloads/attendix_database/users_and_socketId.json', 'utf-8', (data, err) => {
            if (err) { 
                console.log(err)
                return
            }

            let parsedJSON = JSON.parse(data)
            let fullnameInJSON;
            parsedJSON.map((each) => {
                if (each.fullname === fullname) {fullnameInJSON === true}
            })
            
            if (fullnameInJSON !== true) {
                if (parsedJSON === null) {
                    fs.writeFile(
                        'C:/Users/lisa/Downloads/attendix_database/users_and_socketId.json', 
                        JSON.stringify([{fullname, id}]),
                        err => (err) && console.log(err)
                    )
                }
                else {
                    fs.writeFile(
                        'C:/Users/lisa/Downloads/attendix_database/users_and_socketId.json',
                        JSON.stringify({fullname, id}), 
                        err => (err) && console.log(err))
                }
            }

            else {
                fs.readFile('C:/Users/lisa/Downloads/attendix_database/users_and_socketId.json', 'utf-8', (data, err) => {
                    parsedJSON.map((each) => {
                        each.fullname === fullname
                    })
                })
            }
        })

        // fs.writeFile('C:/Users/lisa/Downloads/attendix_database/users_and_socketId.json', data, err => (err) && console.log(err))


        // console.log(Array.from(io.sockets.sockets.keys()))
    })
})