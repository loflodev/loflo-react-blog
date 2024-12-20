import { Post } from "../helpers/types";
import axios from "./axios";

interface GetPostsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

interface GetPostsResponse {
  posts: Post[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const getAllPosts = async (params: GetPostsParams = {}): Promise<GetPostsResponse> => {
  const { data } = await axios.get("/post", { params });
  return data;
};

export const getPostById = async (id: string): Promise<Post> => {
  const { data } = await axios.get(`/post/${id}`);
  return data;
};

export const createPost = async (post: Partial<Post>): Promise<Post> => {
  const { data } = await axios.post("/post", post);
  return data;
};

export const updatePost = async (
  id: string,
  post: Partial<Post>
): Promise<Post> => {
  const { data } = await axios.patch(`/post/${id}`, post);
  return data;
};

export const deletePost = async (id: string): Promise<void> => {
  await axios.delete(`/post/${id}`);
};
