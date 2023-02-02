const express = require("express")
const router = express.Router()
const {
	getAll,
	getStatic,
} = require("../controllers/products")
router.route("/").get(getAll)
router.route("/static").get(getStatic)
module.exports = router
