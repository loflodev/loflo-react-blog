import { useMemo } from "react";
import AuthorCard from "../components/AuthorCard";
import { useFetchPostById } from "../hooks/useFetchPostById";

const PostDetail = () => {
  const { post } = useFetchPostById();

  const authorInfo = useMemo(() => {
    return (
      post && {
        name: post.author,
        date: post.updateAt,
        read: post.view,
      }
    );
  }, [post]);

  const AuthorLayout = useMemo(() => {
    return (
      {
        iconSize: 8,
        flexDirection: "flex items-center",
      }
    );
  }, [post]);

  return post ? (
    <div>
      <div className="wrapper">
        <div className="flex flex-col gap-5 pt-20 items-center">
          <h5 className="text-center">{post.title}</h5>
          <div className="flex items-center">
            {authorInfo && <AuthorCard authorInfo={authorInfo} layout={AuthorLayout} />}
          </div>

          <div className="post-image w-full h-[530px]">
            {post.cover ? (
              <img className="rounded-2xl" src={post.cover} alt={post.title} />
            ) : (
              <img
                className="rounded-2xl"
                src={"/postImage/post-image-fallback.png"}
                alt={"fallback image"}
              />
            )}
          </div>

          <div className="paragraph-2 px-28 pb-20">{post.content}</div>
        </div>
      </div>
    </div>
  ) : (
    <div>{"Post Not Found..."}</div>
  );
};

export default PostDetail;
