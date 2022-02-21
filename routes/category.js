const router = require("express").Router();
const categoryController = require("../controllers/categoryController");

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);
router
  .route("/:id")
  .get(categoryController.getCategoryById)
  .patch(categoryController.updateCategoryById)
  .delete(categoryController.deleteCategoryById);

module.exports = router;
