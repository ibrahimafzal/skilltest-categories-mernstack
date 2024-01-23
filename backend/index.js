const express = require("express")
const app = express()
const cors = require("cors")
const productRoutes = require('./routes/productRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const connectdb = require('./config/connectdb')

require("dotenv").config()

connectdb()

app.use(cors())
app.use(express.json())

app.use("/product", productRoutes)
app.use("/category", categoryRoutes)


app.listen(5000, () => {
    console.log('Server is running on port 5000')
})