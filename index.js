const express = require(`express`)
const app = express()
const PORT = 2100
const cors = require(`cors`)
app.use(cors())

const adminRoute = require(`./routes/admin.route`)
const authRoute = require(`./routes/auth.route`) 
const coffeeRoute = require('./routes/coffee.route')
const orderRoute = require('./routes/order.route')

app.use(`/admin`, adminRoute)
app.use(`/auth`, authRoute)
app.use(`/coffee`, coffeeRoute)
app.use(`/order`, orderRoute)

app.listen(PORT, () => {
    console.log(`Server of Coffee Ordering runs on port ${PORT}`)
})
