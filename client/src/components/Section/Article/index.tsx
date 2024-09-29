import Header from "../../../components/Section/Header";
import ArticleCard from "./ArticleCard";
import { Post } from "../../../helpers/types";

interface Props {
  posts: Post[];
}

const Article = ({ posts }: Props) => {
  const titles = { name: "CSS", filter: "see all article" };

  return (
    <article className="bg-white py-[68px]">
      <div className="wrapper">
        <Header title={titles} />

        <div className="article-grid">
          {!posts || posts.length === 0 ? (
            <div>No Article Found...</div>
          ) : (
            posts.slice(0, 4).map((post) => <ArticleCard post={post} />)
          )}
        </div>
      </div>
    </article>
  );
};

export default Article;
