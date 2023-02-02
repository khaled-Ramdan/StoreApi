require("dotenv").config()
const connnectDB = require("./db/connect")
const productSchma = require("./models/product")
const jsonProducts = require("./products.json")

const start = async () => {
	try {
		await connnectDB(process.env.MONGO_URI)
		await productSchma.deleteMany() // just delete nay thing follows the schema from database
		await productSchma.create(jsonProducts)// create products with schema from  the json file
		console.log(await productSchma.find({}))
		console.log("\nsucess!!!\n")
		process.exit(0)
	} catch (err) {
		console.log(err)
	}
}
start()
