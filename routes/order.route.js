const express = require(`express`)
const orderController = require(`../controllers/order.controller`)
const { authorize } = require('../controllers/auth.controller'); 
const app = express()
app.use(express.json())


app.get('/', authorize, orderController.findAll)
app.post('/', orderController.addOrder)

module.exports = app