// server/src/features/books/book-routes.js
const express = require("express");
const router = express.Router();
const bookController = require("./book-controller");

router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);

module.exports = router;
