type Props = {
  title: {
    name: string;
    filter: string;
  };
};
const SectionHeader = ({ title }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <h2>{title.name}</h2>
      <h3 className="capitalize">{title.filter}</h3>
    </div>
  );
};

export default SectionHeader;
