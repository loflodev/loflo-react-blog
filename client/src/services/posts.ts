import axios from "../api/axios";
import { GetPostsParams } from "../hooks/useFetchPosts";

export const getPostList = async (params: GetPostsParams = {}) => {
  try {
    const response = await axios.get("/post", { params });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getPostById = async (id: string) => {
  try {
    const response = await axios.get(`/post/${id}`);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deletePostById = async (id: string) => {
  try {
    const response = await axios.delete(`post/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
