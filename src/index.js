const path = require('path')
const http = require('http')
const express = require('express')
const { emitWarning } = require('process')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

// let count = 0;

io.on('connection', (socket) => {
    console.log('New web socket connection')
    
    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })
})

server.listen(port, () => {
    console.log(`Server listening to port ${port}`)
})