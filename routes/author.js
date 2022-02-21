const router = require("express").Router();
const authorController = require("../controllers/authorController");

router
  .route("/")
  .get(authorController.getAllAuthors)
  .post(authorController.createAuthor);

router
  .route("/:id")
  .get(authorController.getAuthorById)
  .patch(authorController.updateAuthorById)
  .delete(authorController.deleteAuthorById);

module.exports = router;
