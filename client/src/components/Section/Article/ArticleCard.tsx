import { NavLink } from "react-router-dom";
import { Post } from "../../../helpers/types";
import AuthorCard from "../../AuthorCard";

interface Props {
  post: Post;
}

const ArticleCard = ({ post }: Props) => {
  return (
    <NavLink to={`post/${post._id}`} aria-label={post.title}>
      <div className="flex flex-col p-5 gap-6 rounded-xl shadow-[4px_6px_13px_rgba(215,215,215,0.25)] items-center">
        <div className="w-[260px] h-[280px]">
          <img
            src={post.cover ? post.cover : "/postImage/post-card-fallback.png"}
            alt="javascript book"
            className="rounded-xl"
          />
        </div>

        <h3 className="w-fit">{post.title}</h3>

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
    </NavLink>
  );
};

export default ArticleCard;
