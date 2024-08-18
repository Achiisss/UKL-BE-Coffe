const express = require('express')
const authController = require('../controllers/auth.controller')
const app = express()
const { authorize } = require('../controllers/auth.controller'); 
app.use(express.json())

app.post('/',  authController.authenticate)

module.exports = app