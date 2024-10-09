import { ThTitleProps } from "./PostHeader";

const PostsFooter = ({ thTitle }: ThTitleProps) => {
  return (
    <tfoot>
      <tr>
        <th></th>
        <th>{thTitle.colOne}</th>
        <th>{thTitle.ColTwo}</th>
        <th>{thTitle.ColThree}</th>
        <th>Action</th>
      </tr>
    </tfoot>
  );
};

export default PostsFooter;
