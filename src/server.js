require('dotenv').config()
const { rejects } = require('assert')
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const http = require('http')
const { error } = require('console')
const mysql = require('mysql2/promise')
const crypto = require('crypto')
const { format } = require('date-fns')

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
    async function isEmailInDB() {
        let matchedEmail = await runSQL(`SELECT email FROM users WHERE email = '${req.body.email}' LIMIT 1`)
        let emailInDB = (matchedEmail.length !== 0) ? true : false

        if (emailInDB === true) {
            res.send({showError: true, message: "You are already registered!"})
        }

        else if (emailInDB === false) {
            let insertCode = `
                INSERT INTO users (fullname, email, password, date_joined)
                Values (
                    '${req.body.fullname}',
                    '${req.body.email}',
                    '${crypto.createHash('sha256').update(req.body.password).digest('hex')}',
                    NOW()
                )
            `
            runSQL(insertCode)

            let expireDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
            res.cookie('fullname', req.body.fullname, {expires: expireDate})
            res.cookie('email', req.body.email, {expires: expireDate})
            res.send({showError: false})
        }
    }
    isEmailInDB()
})


app.post('/postSignInDatas', (req, res) => {
    async function areDatasInDB() {
        let matchedDatas = await runSQL(
            `SELECT email, password FROM users WHERE fullname = '${req.body.fullname}' 
            AND email = '${req.body.email}' 
            AND password = '${crypto.createHash('sha256').update(req.body.password).digest('hex')}' 
            LIMIT 1`
        )
        let datasInDB = (matchedDatas.length !== 0) ? true : false

        if (datasInDB === false) {
            res.send({showError: true, message: "Cannot find account!"})
        }

        else {
            let expireDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
            res.cookie('fullname', req.body.fullname, {expires: expireDate})
            res.cookie('email', req.body.email, {expires: expireDate})
            res.send({showError: false})
        }
    }
    areDatasInDB()
})



/* create / join room logic --------------------------------------------- */

app.post('/makeRoom', (req, res) => {
    req.body = JSON.parse(req.body)
    console.log(req.body)

    let addRoom_code = `
        INSERT INTO room VALUES (
            '${req.body.room_id}',
            '${req.body.room_name}'
        );

        INSERT INTO joined_room VALUES (
            '${req.body.email}',
            '${req.body.room_id}'
        )
    `
    runSQL(addRoom_code)
})


app.post('/checkUrlValidity', (req, res) => { // req is the room_id here
    async function isRoomAvailable() {
        let matchedRoom = await runSQL(`SELECT * FROM room WHERE room_id = '${req.body}'`)
        let roomAvailable = matchedRoom.length === 0 ? true : false
        if (roomAvailable === true) {res.send({showError: true})} else {res.send({showError: false})}
    }
    isRoomAvailable()
})




/* socket io stuff ------------------------------------------------ */

const io = require("socket.io")(server, {
    cors: {
        'origin': '*'
    }
})




/* reusable functions --------------------------------- */

async function runSQL(sqlCode) {
    try {
        let connection = await mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password: '22072010',
            database : 'attendix',
            multipleStatements: true
        })
        let [results, fields] = await connection.query(sqlCode)
        return results
    }

    catch (err) {
        console.log(err)
    }
}

runSQL(`SELECT email FROM users WHERE email = 'johndoe@gmail.com' LIMIT 1`).then((log) => console.log(log))