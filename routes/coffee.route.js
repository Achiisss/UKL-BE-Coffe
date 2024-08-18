const express = require(`express`)
const app = express()
app.use(express.json())
const coffeeController = require('../controllers/coffee.controllers')
const { authorize } = require('../controllers/auth.controller'); 

app.post("/", authorize, coffeeController.addCoffee)
app.get("/:key", coffeeController.findCoffee)
app.put("/:id", authorize, coffeeController.updateCoffee)
app.delete("/:id", authorize, coffeeController.deleteCoffee)
app.get("/", coffeeController.getAllCoffee)

module.exports = app