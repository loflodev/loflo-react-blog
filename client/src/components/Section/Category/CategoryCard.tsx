import css from "../../../assets/img/css.png";
import js from "../../../assets/img/js.png";
import react from "../../../assets/img/react.png";
import tailwind from "../../../assets/img/tailwind.png";
import vue from "../../../assets/img/vue.png";
import { IconsType } from "../../../helpers/types";


type Props = {
  icon: IconsType ;
};

type IconRenderType = {
  name: string;
  icon: string;
};

const iconToRender: Record<IconsType, IconRenderType> = {
  css: { name: "CSS", icon: css },
  js: { name: "JavaScript", icon: js },
  react: { name: "ReactJS", icon: react },
  tailwind: { name: "Tailwind", icon: tailwind },
  vue: { name: "Vue", icon: vue },
};

const CategoryCard = ({ icon }: Props) => {
  return (
    <div className={`card-category`}>
      <div className="flex flex-col gap-7">
        <div className="w-14 h-14">
          <img src={iconToRender[icon].icon} alt="css" />
        </div>
        <h2>{iconToRender[icon].name}</h2>
      </div>
    </div>
  );
};

export default CategoryCard;
