import Header from "../../../components/Section/Header";
// import book from "../../../assets/img/javascript book.png";
import ArticleCard from "./ArticleCard";
import { Post } from "../../../helpers/types";

interface Props {
  posts: Post[];
}

const Article = ({ posts }: Props) => {
  const title = { name: "CSS", filter: "see all article" };
  // const article = {
  //   title: "Fundamenta of JavaSrcipt",
  //   cover: book,
  //   category: "css",
  //   author: "Dasteen",
  //   date: "Jan 10, 2022",
  //   readCounter: "3min read",
  // };

  // animals.slice(2)

  return (
    <article className="bg-white py-[68px]">
      <div className="wrapper">
        <Header title={title} />

        <div className="flex pt-12 justify-between flex-wrap">
          {posts.slice(0, 4).map((post) => (
            <ArticleCard post={post} />
          ))}
        </div>
      </div>
    </article>
  );
};

export default Article;
