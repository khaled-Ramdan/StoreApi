const mongoose = require("mongoose")
const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "product name must be provided"],
	},
	price: {
		type: Number,
		required: [true, "product price must be provided"],
	},
	featured: {
		type: Boolean,
		default: false,
	},
	rating: {
		type: Number,
		default: 4.5,
	},
	creaetedAt: {
		type: Date,
		default: Date.now(),
	},
	campany: {
		type: String,
		enum: {
			values: ["ikea", "liddy", "caressa", "marcos"],
			message: "{VALUSE} is not supported",
		},
	},
})

module.exports = mongoose.model("product", ProductSchema)
