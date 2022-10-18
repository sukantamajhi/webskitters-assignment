import * as express from "express";
import services from "./services";
import userService from "./services"

const router = express.Router();


/**
 * @type - POST
 * @route -  /api/users/
 * @desc - route for create user.
 * @function - create
 */

router.post("/", async (req: any, res: any) => {
	services.create(req).then((response: any) => {
		res.status(response.status).send({
			result: response.result,
			message: response.message
		})
	}).catch((error: any) => {
		res.status(error.status).send({
			result: error.result,
			message: error.message
		})
	})
})


/**
 * @type - POST
 * @route -  /api/users/login
 * @desc - route for login user.
 * @function - login
 */

router.post("/login", async (req: any, res: any) => {
	services.login(req).then((response: any) => {
		res.status(response.status).send({
			result: response.result,
			message: response.message
		})
	}).catch((error: any) => {
		res.status(error.status).send({
			result: error.result,
			message: error.message
		})
	})
})

export default router