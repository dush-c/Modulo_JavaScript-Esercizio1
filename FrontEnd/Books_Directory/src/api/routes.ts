import express from "express";
import bookRouter from "./books/book.router";
// import libraryRouter from "./library/library.router";

const router = express.Router();

router.use("/book", bookRouter);
// router.use("library", libraryRouter);

export default router;
