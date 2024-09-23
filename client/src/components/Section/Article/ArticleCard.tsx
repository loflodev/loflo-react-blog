import { Post } from "../../../helpers/types";
import AuthorCard from "../../AuthorCard";

interface Props {
  post: Post;
}

const ArticleCard = ({ post }: Props) => {
  return (
    <div className="flex flex-col gap-6 w-[350px] rounded-xl p-5 shadow-[4px_6px_13px_rgba(215,215,215,0.25)] items-center">
      <div className="w-[260px] h-[280px]">
        <img
          src={post.cover ? post.cover : "/postImage/post-placeholder.jpg"}
          alt="javascript book"
          className="rounded-xl"
        />
      </div>

      <h3>{post.title}</h3>

      <div className="flex items-center pt-11">
        <AuthorCard
          authorInfo={{
            name: post.author,
            date: post.createAt,
            read: post.view ? post.view : "",
          }}
        />
      </div>
    </div>
  );
};

export default ArticleCard;
