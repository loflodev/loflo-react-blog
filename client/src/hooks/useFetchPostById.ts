import { useEffect, useState } from "react";
import { getPostById } from "../services/posts";
import { Post } from "../helpers/types";
import { useParams } from "react-router-dom";

export const useFetchPostById = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    const fectchingPostById = async () => {
      if (!id) return;

      const reponse = await getPostById(id);

      if (reponse?.status === 400) return;

      setPost(reponse?.data);
    };
    fectchingPostById();
  }, [id]);

  return { post };
};
