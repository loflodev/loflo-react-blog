import Hero from "../components/Section/Hero";
import Article from "../components/Section/Article";
import Category from "../components/Section/Category";
import { useFetchPosts } from "../hooks/useFetchPosts";
import { Post } from "../helpers/types";

const Home = () => {
  const { postResponse } = useFetchPosts();

  const posts = postResponse.posts || [];

  const categories = posts
    .map((post: Post) => post.category)
    .filter((category, index, array) => array.indexOf(category) === index);

  return (
    <>
      <Hero />
      <Category categories={categories} />
      <Article posts={posts} />
    </>
  );
};

export default Home;
