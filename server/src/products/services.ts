import ProductModel from "./model"
import { request } from "../services/interfaces"

export default {
	create: (req: request) => {
		return new Promise(async (resolve, reject) => {
			try {
				const newProduct = new ProductModel({
					name: req.body.name,
					price: req.body.price,
					offerPrice: req.body.offerPrice,
					createdBy: req.body.createdBy
				})
				const createProduct = await newProduct.save();

				if (!createProduct) {
					return reject({
						status: 400,
						result: createProduct,
						message: "Product creation failed"
					})
				} else {
					return resolve({
						status: 200,
						result: createProduct,
						message: "Product created successfully"
					})
				}

			} catch (error) {
				console.log(error, "<<-- Error in create Product")
				return reject({
					status: 500,
					result: error,
					message: "Internal server error"
				})
			}
		})
	},

	getAllProducts: (req: request) => {
		return new Promise(async (resolve, reject) => {
			try {
				const products = await ProductModel.find({}).sort({ createdAt: -1 })
				if (products?.length > 0) {
					return resolve({
						status: 200,
						result: products,
						message: "Products found successfully."
					})
				} else {
					return resolve({
						status: 404,
						result: [],
						message: "No Products available."
					})
				}
			} catch (error) {
				console.log(error, "<<-- Error in get all products")
				return reject({
					status: 500,
					result: error,
					message:"Internal server error"
				})
			}
		})
	},

	update: (req: request) => {
		return new Promise(async (resolve, reject) => {
			try {
				const product = await ProductModel.findOne({ _id: req.params.productId })
				if (!product) {
					return reject({
						status: 400,
						result: {},
						message: "Product not found"
					})
				} else {
					product.name = req.body.name || product.name
					product.price = req.body.price || product.price
					product.offerPrice = req.body.offerPrice || product.offerPrice
				}

				let updatedProduct = await product.save()

				if (!updatedProduct) {
					return reject({
						status: 400,
						result: updatedProduct,
						message: "Product update failed"
					})
				} else {
					return resolve({
						status: 200,
						result: updatedProduct,
						message: "Product updated successfully"
					})
				}

			} catch (error) {
				console.log(error, "<<-- Error in update Product")
				return reject({
					status: 500,
					result: error,
					message: "Internal server error"
				})
			}
		})
	},

	// delete: (req: request) => {
	// 	return new Promise(async (resolve, reject) => {
	// 		try {
	// 			const product = await ProductModel.findOneAndDelete({ _id: req.params.
	// 				productId });


	// 		} catch (error) {
	// 			console.log(error, "<<-- Error in delete product")
	// 			return reject({
	// 				status: 500,
	// 				result: error,
	// 				message: "Internal server error"
	// 			})
	// 		}
	// 	})
	// }
}