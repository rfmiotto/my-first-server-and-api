const os = require('os')
const log = require('./logger')

setInterval(() => {
    let { freemem, totalmem } = os
    
    console.log( `${parseInt(freemem/1024/1024)} MB`, `${parseInt(totalmem/1024/1024)} MB` )
    
    freemem = freemem/1024/1024
    totalmem = totalmem/1024/1024
    
    stats = {
        free: `${parseInt(freemem)} MB`,
        total: `${parseInt(totalmem)} MB`,
        usage: `${100-parseInt(freemem/totalmem*100)}%`
    }
    
    console.clear()
    console.table(stats)
    log(`${JSON.stringify(stats)} \n`)

}, 1000)

