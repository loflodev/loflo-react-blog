import { useCallback } from "react";
import { DeletePostIcon } from "../../../assets/svg/DeletePostIcon";
import { EditPostIcon } from "../../../assets/svg/EditPostIcon";
import { Post } from "../../../helpers/types";
import { deletePostById } from "../../../services/posts";

interface PostListProps {
  post: Post;
}

const PostList = ({ post }: PostListProps) => {
  const deletePost = useCallback(async (id: string) => {
    const res = await deletePostById(id);

    console.log(res);
  }, []);

  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img
                src={post.cover ?? "/postImage/post-card-fallback.png"}
                alt={post.title}
              />
            </div>
          </div>
          <div>
            <div className="font-bold text-base">{post.author}</div>
            <div className="text-sm opacity-50">{post.category}</div>
          </div>
        </div>
      </td>
      <td className="text-base">
        {post.title}
        <br />
        <span className="badge badge-ghost badge-sm">{post.tags}</span>
      </td>
      <td>{post.createAt}</td>
      <th>
        <button className="btn btn-ghost btn-xs text-black">
          <EditPostIcon height={20} width={20} color="#2b2c34" />
          edit
        </button>
        <button
          className="btn btn-ghost btn-xs text-black"
          onClick={() => deletePost(post._id)}
        >
          <DeletePostIcon height={20} width={20} color="#2b2c34" />
          delete
        </button>
      </th>
    </tr>
  );
};

export default PostList;
