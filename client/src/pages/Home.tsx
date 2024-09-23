import Hero from "../components/Section/Hero";
import Article from "../components/Section/Article";
import Category from "../components/Section/Category";
import { useFetchPosts } from "../hooks/useFetchPosts";

const Home = () => {
  const { posts } = useFetchPosts();
 
  return (
    <>
      <Hero />
      <Category />
      <Article posts={posts} />
    </>
  );
};

export default Home;
