import { useEffect, useState } from "react";
import { getPostList } from "../services/posts";
import { Post } from "../helpers/types";

export const useFetchPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fectchingPosts = async () => {
      const reponse = await getPostList();

      if (reponse?.status === 400) return;

      setPosts(reponse?.data);
    };
    fectchingPosts();
  }, []);

  return { posts };
};
