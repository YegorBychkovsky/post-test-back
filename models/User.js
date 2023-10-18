import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
    about: String,
    sex: String,
    age: Number,
  },
  {
    timestamps: true,
  },
);
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
