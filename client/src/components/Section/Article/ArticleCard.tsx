import book from "../../../assets/img/javascript book.png";
import AuthorCard from "../../AuthorCard";

interface Article {
  article: {
    title: string;
    cover: string;
    category: string;
    author: string;
    date: string;
    readCounter: string;
  };
}

const ArticleCard = ({ article }: Article) => {
  const authorInfo = {
    name: article.author,
    date: article.date,
    read: article.readCounter,
  };

  return (
    <div className="flex flex-col gap-6 rounded-xl p-5">
      <div className="w-[16.25rem] h-[12.375rem] rounded-xl">
        <img src={book} alt="javascript book" className="object-cover" />
      </div>

      <h3>{article.title}</h3>

      <div className="flex items-center pt-11">
        <AuthorCard authorInfo={authorInfo} />
      </div>
    </div>
  );
};

export default ArticleCard;
