import PostModel from "../models/Post.js";
import UserModel from "../models/User.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();

    if (posts.length === 0) {
      res.json({ message: "Нет доступных постов" });
    } else {
      res.json(posts);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не удалось получить посты" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    const user = await UserModel.findById(author);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const post = new PostModel({
      title,
      content,
      author: user._id,
      createdAt: new Date(),
    });

    const savedPost = await post.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не удалось создать пост" });
  }
};
