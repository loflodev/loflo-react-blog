import mongoose from "mongoose";

interface Article {
  title: string;
  content: string;
  author: string;
  category?: string;
  tags?: string[];
  cover?: string;
  view?: number;
  readCounter?: string;
  createAt: Date;
  updateAt: Date;
}

const BlogPostSchema = new mongoose.Schema<Article>({
  title: { type: String, require: true },
  content: { type: String, require: true },
  author: { type: String, requre: true },
  category: { type: String, requier: true },
  tags: { type: [String], require: false },
  cover: { type: String, require: false },
  view: { type: Number, require: false },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

export const BlogPostModel = mongoose.model("BlogPost", BlogPostSchema);
export const getPosts = () => BlogPostModel.find();
export const getPostById = (id: string) => BlogPostModel.findById(id);
export const savePost = (post: Article) =>
  new BlogPostModel(post).save().then((p) => p.toObject());
export const deletePostById = (id: string) =>
  BlogPostModel.findByIdAndDelete({ _id: id });
export const updateUser = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
