import { Post } from "../helpers/types";
import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema<Post>({
  title: { type: String, require: true },
  content: { type: String, require: true },
  author: { type: String, requre: true },
  category: { type: String, requier: true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  tags: [String],
  cover: String,
  view: Number,
});

export const BlogPostModel = mongoose.model("BlogPost", BlogPostSchema);
export const getPosts = () => BlogPostModel.find();
export const getPostById = (id: string) => BlogPostModel.findById(id);
export const savePost = (post: Post) =>
  new BlogPostModel(post).save().then((p) => p.toObject());
export const deletePostById = (id: string) =>
  BlogPostModel.findByIdAndDelete({ _id: id });
export const updatePostById = (id: string, post: Record<string, any>) =>
  BlogPostModel.findByIdAndUpdate(id, post);
