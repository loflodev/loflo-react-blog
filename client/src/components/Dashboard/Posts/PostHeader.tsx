export interface ThTitleProps {
  thTitle: {
    colOne: string;
    ColTwo: string;
    ColThree: string;
  };
}

const PostHeader = ({ thTitle }: ThTitleProps) => {
  return (
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>{thTitle.colOne}</th>
        <th>{thTitle.ColTwo}</th>
        <th>{thTitle.ColThree}</th>
        <th>Action</th>
      </tr>
    </thead>
  );
};

export default PostHeader;
