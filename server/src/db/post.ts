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

interface GetPostsOptions {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export const getPosts = async ({ page = 1, limit = 10, search = '', category = '' }: GetPostsOptions = {}) => {
  const skip = (page - 1) * limit;
  
  // Build query
  const query: any = {};
  
  // Add search condition if search term is provided
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
      { author: { $regex: search, $options: 'i' } }
    ];
  }
  
  // Add category filter if provided
  if (category) {
    query.category = category;
  }

  // Get total count for pagination
  const total = await BlogPostModel.countDocuments(query);
  
  // Get paginated results
  const posts = await BlogPostModel.find(query)
    .sort({ createAt: -1 }) // Sort by creation date, newest first
    .skip(skip)
    .limit(limit);

  return {
    posts,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const getPostById = (id: string) => BlogPostModel.findById(id);
export const savePost = (post: Post) =>
  new BlogPostModel(post).save().then((p) => p.toObject());
export const deletePostById = (id: string) =>
  BlogPostModel.findByIdAndDelete({ _id: id });
export const updatePostById = (id: string, post: Record<string, any>) =>
  BlogPostModel.findByIdAndUpdate(id, post);
