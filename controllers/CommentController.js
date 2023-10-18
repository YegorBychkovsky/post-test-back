import CommentModel from "../models/Comment.js";
import PostModel from "../models/Post.js";
import UserModel from "../models/User.js";

export const createComment = async (req, res) => {
  try {
    const userId = req.body.author;
    const text = req.body.text;
    const postId = req.body.postId;
    console.log(postId);
    console.log(text);
    console.log(userId);

    const user = await UserModel.findById(userId); // Используйте переменную userId
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const post = await PostModel.findById(postId); // Используйте переменную postId
    if (!post) {
      return res.status(404).json({ message: "Пост не найден" });
    }

    const comment = new CommentModel({
      text,
      author: user._id,
      post: post._id,
      createdAt: new Date(),
    });

    const savedComment = await comment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не удалось создать комментарий" });
  }
};

export const replyToComment = async (req, res) => {
  try {
    const { text, postId, parentCommentId, userId } = req.body;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const post = await PostModel.findById(postId);

    let parentComment = null;
    if (parentCommentId) {
      parentComment = await CommentModel.findById(parentCommentId);
      if (!parentComment) {
        return res
          .status(404)
          .json({ message: "Родительский комментарий не найден" });
      }
    }

    const comment = new CommentModel({
      text,
      author: user._id,
      parentComment: parentCommentId,
      createdAt: new Date(),
    });

    const savedComment = await comment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не удалось создать комментарий" });
  }
};

export const getComments = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await CommentModel.find({ post: postId }).populate(
      "author",
    );

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не удалось получить комментарии" });
  }
};
export const getCommentsForComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    console.log(commentId);
    const comments = await CommentModel.find({
      parentComment: commentId,
    }).populate("author");
    console.log(comments);
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не удалось получить комментарии" });
  }
};
