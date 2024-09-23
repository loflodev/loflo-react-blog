import axios from "../api/axios";

export const getPostList = async () => {
  try {
    const response = await axios.get("/post");

    return response
  } catch (error) {
    console.log(error);
  }
};


