const router = require("express").Router();
const authorController = require("../controllers/authorController");

router
  .post("/author-section", authorController.createAuthorSection)
  .get("/author-section", authorController.getAuthorSection)
  .delete(
  "/author-section/:id",
  authorController.deleteAuthorSection
);

module.exports = router;
