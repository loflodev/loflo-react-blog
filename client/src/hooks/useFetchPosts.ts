import { useEffect, useState } from "react";
import { getPostList } from "../services/posts";
import { Post } from "../helpers/types";

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetPostsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export interface GetPostsResponse {
  posts: Post[];
  pagination: PaginationData;
}

export const useFetchPosts = (params?: GetPostsParams) => {
  const [postResponse, setPostResponse] = useState<GetPostsResponse>({
    posts: [],
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0
    }
  });

  useEffect(() => {
    const fectchingPosts = async () => {
      const reponse = await getPostList(params);

      if (reponse?.status === 400) return;

      setPostResponse(reponse?.data);
    };
    fectchingPosts();
  }, [params]);

  return { postResponse };
};
