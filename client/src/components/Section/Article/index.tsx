import Header from "../../../components/Section/Header";
import book from "../../../assets/img/javascript book.png";
import ArticleCard from "./ArticleCard";



const Article = () => {
  const title = { name: "CSS", filter: "see all article" };
  const article = {
    title: "Fundamenta of JavaSrcipt",
    cover: book,
    category: "css",
    author: "Dasteen",
    date: "Jan 10, 2022",
    readCounter: "3min read",
  };

  return (
    <article className="bg-white py-[68px]">
      <div className="wrapper">
        <Header title={title} />

        <div className="pt-12">
          <ArticleCard article={article}/>
        </div>
      </div>
    </article>
  );
};

export default Article;


/* Article Post Card

Article Post Card

*/

width: 300px;
height: 425px;

/* White */
background: #FFFFFE;
border-radius: 12px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;

