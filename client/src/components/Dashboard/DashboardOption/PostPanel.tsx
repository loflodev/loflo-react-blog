import { useFetchPosts } from "../../../hooks/useFetchPosts";
import Posts from "../Posts";

const PostPanel = () => {
  const { posts } = useFetchPosts();

  return (
    <div className="d-posts-header pt-12">
      <div className="flex justify-between">
        <h3>List published articles</h3>
        Date Filter
      </div>

      <div>
        <Posts posts={posts} />
      </div>
    </div>
  );
};

export default PostPanel;
