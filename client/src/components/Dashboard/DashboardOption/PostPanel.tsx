import { useFetchPosts } from "../../../hooks/useFetchPosts";
import { DashboardStats } from "../DashboardStats";
import Posts from "../Posts";

const PostPanel = () => {
  const { posts } = useFetchPosts();

  return (
    <>
      <DashboardStats />
      <div className="d-posts-header pt-12">
        <div className="flex justify-between">
          <h3>List published articles</h3>
          Date Filter
        </div>

        <div>
          <Posts posts={posts} />
        </div>
      </div>
    </>
  );
};

export default PostPanel;
