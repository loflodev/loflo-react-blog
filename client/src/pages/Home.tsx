import Hero from "../components/Section/Hero";
import Article from "../components/Section/Article";
import Category from "../components/Section/Category";
import { useFetchPosts } from "../hooks/useFetchPosts";

const Home = () => {
  const { posts } = useFetchPosts();

  const categories = (posts || []).map((post) => post.category)
 
  return (
    <>
      <Hero />
      <Category categories={categories} />
      <Article posts={posts} />
    </>
  );
};

export default Home;
