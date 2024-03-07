import express from "express";
import { add, list } from "./cart-item.controller";
//updateQuantity
const router = express.Router();

router.get("/", list);
router.post("/", add);
// router.patch("/:id", updateQuantity);

export default router;
