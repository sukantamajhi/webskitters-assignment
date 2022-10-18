import { request } from "../services/interfaces"
import UserModel from "./model"

export default {
	create: (req: request) => {
		return new Promise(async(resolve, reject) => {
			try {
				const user = await UserModel.findOne({ email: req.body.email });
				if (user) {
					return reject({
						status: 400,
						result: null,
						message:"User already exists"
					})
				} else {
					const newUser = new UserModel({
						name: req.body?.name,
						email: req.body?.email,
						password: req.body?.password
					})
					const createUser = await newUser.save()
					if (createUser) {
						return resolve({
							status: 201,
							result: createUser,
							message: "User created successfully"
						})
					} else {
						return reject({
							status: 400,
							result: createUser,
							message:"User creation failed"
						})
					}
				}
			} catch (error) {
				console.log(error, "<<-- Error in create user")
				return reject({
					status: 500,
					result: error,
					message:"Internal server error"
				})
			}
		})
	},

	login: (req: request) => {
		return new Promise(async (resolve, reject) => {
			try {
				const user = await UserModel.findOne({
					email: req.body.email,
					password: req.body.password
				})

				if (user) {
					return resolve({
						status: 200,
						result: user,
						message: "User successfully found"
					})
				} else {
					return reject({
						status: 404,
						result: {},
						message: "User not found"
					})
				}
			} catch (error) {
				console.log(error, "Error in login user")
				return reject({
					status: 500,
					result: error,
					message: "Internal server error"
				})
			}
		})
	}
}