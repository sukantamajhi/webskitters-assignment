import express from "express";
import Users from "../user"
import Products from "../products"

let router = express.Router();
router.use("/users", Users)
router.use("/products", Products)

export default router;
