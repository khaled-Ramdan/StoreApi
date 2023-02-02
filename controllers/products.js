const productScehma = require("../models/product")
const getStatic = async (req, res) => {
	// this is just for testing purposes
	const products = await productScehma.find({})
	res.status(200).json({ products, nHits: products.length })
}
const getAll = async (req, res) => {
	let {
		featured,
		company,
		name,
		sort,
		field,
		numericFilter,
	} = req.query
	const queryObject = {}
	if (featured) {
		queryObject.featured =
			featured === "true" ? true : false
	}
	if (company) {
		queryObject.company = company
	}
	if (name) {
		queryObject.name = { $regex: name, $options: "i" }
	}
	let result = productScehma.find(queryObject)
	if (sort) {
		const sortList = sort.split(",").join("")
		result.sort(sortList)
		queryObject.sort = sort
	} else {
		result.sort("creaetedAt")
	}
	if (field) {
		const selectList = field.split(",").join("")
		result.select(selectList)
		queryObject.field = field
	}
	if (numericFilter) {
		const filterObject = {}
		const operatorMap = {
			">": "$gt",
			"<": "$lt",
			"<=": "$lte",
			">=": "$gte",
			"=": "$eq",
		}
		const regex = /\b(<|<=|=|>|>=)\b/g //make reqex
		console.log(regex)
		let filters = numericFilter.replace(
			regex,
			(match) => `-${operatorMap[match]}-`
		)
		const opetions = ["price", "rating"]
		filters = filters.split(",").forEach((element) => {
			const [field, operator, value] = element.split("-")
			if (opetions.includes(field)) {
				filterObject[field] = {
					[operator]: Number(value),
				}
			}
		})
		result.find(filterObject)
	}
	console.log(queryObject)
	const page = Number(req.query.page) || 1
	const limit = Number(req.query.limit) || 10
	const skip = (page - 1) * limit
	result.skip(skip).limit(limit)
	const product = await result
	res.json({ product, nHits: product.length })
}
module.exports = {
	getStatic,
	getAll,
}
