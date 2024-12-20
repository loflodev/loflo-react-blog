import { useEffect, useState } from 'react';
import { Post } from '../helpers/types';
import { getAllPosts } from '../api/post';
import ArticleCard from '../components/Section/Article/ArticleCard';
import SectionHeader from '../components/Section/Header';

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  });
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await getAllPosts({
        page,
        limit: pagination.limit,
        search,
        category
      });
      setPosts(response.posts);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search, category]);

  const handlePageChange = (newPage: number) => {
    fetchPosts(newPage);
  };

  const title = { name: "Our Blog Posts", filter: "all posts" };

  return (
    <div className="min-h-screen bg-light-grey-1 py-12">
      <div className="wrapper">
        <div className="mb-8">
          <SectionHeader title={title} />
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full md:w-1/3"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select select-bordered w-full md:w-1/4"
          >
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Programming">Programming</option>
            <option value="Web Development">Web Development</option>
            <option value="AI">AI</option>
          </select>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <ArticleCard key={post._id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="join">
                  <button
                    className="join-item btn"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                  >
                    «
                  </button>
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`join-item btn ${page === pagination.page ? 'btn-active' : ''}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    className="join-item btn"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                  >
                    »
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
