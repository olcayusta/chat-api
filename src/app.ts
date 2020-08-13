import express from 'express'
import cors from 'cors'
import pool from './db'
import {userService} from './services/user.service'
import {messageService} from './services/message.service'

const app = express()

app.use(cors())

app.get('/messages', async (req, res) => {
    try {
        const messages = await messageService.getAllMessages()
        res.json(messages)
    } catch (e) {
        res.json(e)
    }
})

app.get('/rooms', async (req, res) => {
    const {rows} = await pool.query('SELECT * FROM "room"')
    res.json(rows)
})

app.get('/users', async (req, res) => {
    try {
        const users = await userService.getAllUsers()
        res.json(users)
    } catch (e) {
        res.json(e)
    }
})

export default app
