const router = require("express").Router();
const blogController = require("../controllers/blogController");
const { verifyToken } = require("../controllers/userController");

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(verifyToken, blogController.createBlog);

router
  .route("/:id")
  .get(blogController.getBlogById)
  .patch(blogController.updateBlogById)
  .delete(blogController.deleteBlogById);
router.get("/category/:id", blogController.getBlogsByCategory);
router.get("/find-exeption/:categoryId/:blogId", blogController.findExeptMe);

module.exports = router;
