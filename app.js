require("dotenv").config()
require('express-async-errors')
const express = require("express")
const app = express()
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")
const mydb = require('./db/connect')
const routes = require('./routes/products')
//middleware
app.use(express.json())

// routes
app.get("/", (req, res) => {
	res.send(`<h1>Store API</h1>
	<a href = "/api/v1/products">Products route</a>
	`)
})
app.use('/api/v1/products',routes);

//products routes
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async (req, res) => {
	try {
		//connect db
		await mydb(process.env.MONGO_URI)
		app.listen(port, () => {
			console.log(`server is listening on ${port}`)
		})
	} catch (err) {
		console.log(err)
	}
}

start()
//comment