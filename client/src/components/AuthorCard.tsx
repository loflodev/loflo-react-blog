import persona from "../assets/img/persona.png";

type Props = {
  authorInfo: {
    name: string;
    date: string;
    read: string;
  };
};
const AuthorCard = ({ authorInfo }: Props) => {
  return (
    <>
      <div className="w-14 h-14 rounded-full">
        <img src={persona} alt="author of article" />
      </div>
      <div className="pl-3">
        <p className="author-name">{authorInfo.name}</p>
        <p className="author-date">{` ${authorInfo.date} ∙ ${authorInfo.read}`}</p>
      </div>
    </>
  );
};

export default AuthorCard;
