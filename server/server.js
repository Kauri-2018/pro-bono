const path = require('path')
const express = require('express')

const authRoutes = require('./routes/auth')
const matterRoutes = require('./routes/matters')
const profileRoutes = require('./routes/profiles')

const server = express()

// middleware
server.use(express.static(path.join(__dirname, '../public')))

// routes
server.use('/api/v1/auth/', authRoutes)
server.use('/api/v1/matters/', matterRoutes)
server.use('/api/v1/profiles/', profileRoutes)

// wildcard route
server.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = server
