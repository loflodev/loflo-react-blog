import axios from "../api/axios";

export const getPostList = async () => {
  try {
    const response = await axios.get("/post");

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
