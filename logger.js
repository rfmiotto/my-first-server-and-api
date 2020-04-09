const EventEmitter = require('events')
const fs = require('fs')
const path = require('path')

const emitter = new EventEmitter()

emitter.on('signal', (message) => {
    // console.log(message)
    fs.appendFile(path.join(__dirname, 'log.txt'), message, err => {
        if (err) throw err
    })
})

function logMessage(message) {
    emitter.emit('signal', message)
}

module.exports = logMessage