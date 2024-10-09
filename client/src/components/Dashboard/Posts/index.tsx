import { Post } from "../../../helpers/types";
import PostsFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import PostList from "./PostList";

interface Props {
  posts: Post[];
}

const Posts = ({ posts }: Props) => {
  const thTitle = {
    colOne: "Author",
    ColTwo: "Title",
    ColThree: "Date",
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <PostHeader thTitle={thTitle} />
        <tbody>
          {/* row 1 */}
          {posts.map((post) => (
            <PostList post={post} />
          ))}
        </tbody>
        <PostsFooter thTitle={thTitle} />
      </table>
    </div>
  );
};

export default Posts;
