import express from "express";
import { detail, list } from "./book.controller";

const router = express.Router();

router.get("/", list);
router.get("/:id", detail);

export default router;
