import * as express from "express";
import services from "./services";

const router = express.Router();


/**
 * @type - POST
 * @route -  /api/products
 * @desc - route for add product.
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
 * @type - GET
 * @route -  /api/products
 * @desc - route for get product.
 * @function - getAllProducts
 */
router.get("/", async (req: any, res: any) => {
	services.getAllProducts(req).then((response: any) => {
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
 * @type - PUT
 * @route -  /api/products/:productId
 * @desc - route for update product.
 * @function - update
 */
router.put("/:productId", async (req: any, res: any) => {
	services.update(req).then((response: any) => {
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