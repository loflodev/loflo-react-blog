import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { ChangeEvent, useState } from "react";
import UploadImage from "../../UploadImage";
import Button from "../../Button";

const NewPost = () => {
  const [text, setText] = useState<string>();
  const [postForm, setPostForm] = useState({
    cover: "",
    title: "",
    category: "",
    tags: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostForm((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditorChange = (e: EditorTextChangeEvent) => {
    if (e.htmlValue) {
      setText(e.htmlValue);
    }
  };
  const hanldeSubmit = () => {
    console.log("klkllk");
  };
  return (
    <div className="col-[2/-1]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
        <div className="row-[1/3] col-[1/3]">
          <UploadImage />
        </div>
        <div className="col-[3/-1]">
          <input
            id="title"
            type="text"
            name="title"
            value={postForm.title}
            onChange={(e) => handleChange(e)}
            placeholder="Post Title"
            className="input input-bordered w-full"
          />
        </div>
        <div className="col-[3/5]">
          <input
            id="category"
            type="text"
            name="category"
            value={postForm.category}
            onChange={(e) => handleChange(e)}
            placeholder="Add category"
            className="input input-bordered w-full"
          />
        </div>
        <div className="">
          <input
            id="tags"
            type="text"
            name="tags"
            value={postForm.tags}
            onChange={(e) => handleChange(e)}
            placeholder="Add Tags"
            className="input input-bordered w-full"
          />
        </div>
        <div className="col-[1/-1]">
          <Editor
            id="content"
            name="content"
            value={postForm.content}
            onTextChange={(e) => handleEditorChange(e)}
            style={{ height: "320px" }}
          />
        </div>
        <div className="col-[1/-1]">
          <Button
            fitContent={true}
            onClick={hanldeSubmit}
            disabled={Boolean(!postForm.title) && Boolean(!text)}
          >
            Create Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
