const express = require('express')
const routes = express.Router()
const user = require('../Controller/user')
const auth = require('../Middleware/auth')
routes.get('/users',user.index)
routes.post('/create',user.create)
routes.post('/auth',auth,user.authentication)

module.exports = routes;