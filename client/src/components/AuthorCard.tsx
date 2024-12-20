import persona from "../assets/img/persona.png";

type Props = {
  authorInfo: {
    name: string;
    date: string;
    read: string | undefined;
  },
  layout?: {
    iconSize: number,
    flexDirection: string
  }
};
const AuthorCard = ({ authorInfo, layout }: Props) => {
  const { iconSize, flexDirection } = layout || {};
  return (
    <>
      <div className={`w-${iconSize ? iconSize : 14} h-${iconSize ? iconSize : 14} rounded-full ${iconSize} mr-4`}>
        <img src={persona} alt="author of article" />
      </div>
      <div className={`${flexDirection}  id="pl-3`}>
        <p className="author-name mr-2">{authorInfo.name}</p>
        <p className="author-date">{` ${authorInfo.date} ∙ ${authorInfo.read}`}</p>
      </div>
    </>
  );
};

export default AuthorCard;
