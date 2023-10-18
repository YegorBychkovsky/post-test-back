import express from "express";
import {
  CommentController,
  PostsController,
  UserController,
} from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";
import {
  loginValidation,
  registerValidation,
} from "../validations/validations.js";

const indexRouter = express.Router();

/* GET home page. */
indexRouter.get("/", function (req, res, next) {
  res.send("index", { title: "Express!" });
});
indexRouter.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login,
);
indexRouter.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register,
);
indexRouter.get("/auth/me", checkAuth, UserController.getMe);

indexRouter.put(
  "/profile/change",
  checkAuth,
  UserController.changeProfile,
);

indexRouter.get("/posts", checkAuth, PostsController.getPosts);
indexRouter.post("/posts/create", checkAuth, PostsController.createPost);

indexRouter.get(
  "/comments/:postId",
  checkAuth,
  CommentController.getComments,
);
indexRouter.get(
  "/commentsForComment/:commentId",
  checkAuth,
  CommentController.getCommentsForComment,
);
indexRouter.post(
  "/comment/create",
  checkAuth,
  CommentController.createComment,
);
indexRouter.post(
  "/comment/reply",
  checkAuth,
  CommentController.replyToComment,
);

export { indexRouter };
