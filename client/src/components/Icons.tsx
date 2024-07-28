import { FunctionComponent } from "react";
import linkedin from "../assets/img/linkedin.png";
import medium from "../assets/img/medium.png";
import twitter from "../assets/img/Twitter.png";
import instagram from "../assets/img/instagram.png";

type IconsProps = {
  w?: number;
  h?: number;
  iconName: "twitter" | "medium" | "instagram" | "linkedin";
};

const Icons: FunctionComponent<IconsProps> = ({ w, h, iconName, ...rest }) => {
  const icons = {
    twitter: twitter,
    medium: medium,
    instagram: instagram,
    linkedin: linkedin,
  };
  return (
    <div className={`w-${w} h-${h}`}>
      <img src={icons[iconName]} {...rest} />
    </div>
  );
};

export default Icons;
