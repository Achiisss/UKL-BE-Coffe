const express = require(`express`)
const app = express()
app.use(express.json())

const { authorize } = require('../controllers/auth.controller'); 
const adminController = require('../controllers/admin.controller')

app.post("/",  adminController.addAdmin)

module.exports = app