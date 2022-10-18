import * as mongoose from "mongoose"
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	name: {
		type: String
	},
	price: {
		type: Number
	},
	offerPrice: {
		type: Number
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: "users"
	}
})

ProductSchema?.pre("save", function (next) {
	this.populate("createdBy");
	next()
})
ProductSchema?.pre("find", function (next) {
	this.populate("createdBy");
	next()
})
ProductSchema?.pre("findOne", function (next) {
	this.populate("createdBy");
	next()
})

export default mongoose.model("products", ProductSchema)