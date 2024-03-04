// build your server here and require it from index.js
const express = require('express')
const projectRouter = require('./projects/router.js')
const resourceRouter = require('./resources/router.js');

const server = express()

server.use(express.json())

server.use('/api/resources', resourceRouter);

server.use('/api/projects', projectRouter)

server.use('*', (req, res) => {
    res.json({ api: 'up' })
})

module.exports = server;