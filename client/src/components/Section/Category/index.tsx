import CategoryCard from "./CategoryCard";
import SectionHeader from "../Header";

const Category = () => {
  const title = { name: "Browse the category", filter: "see all category" };
  return (
    <section className="bg-light-grey-1 py-[68px]">
      <div className="wrapper">
        <div>
          <SectionHeader title={title} />
        </div>
        <div className="flex pt-12 justify-between s-mb:justify-center flex-wrap">
          <CategoryCard icon="css" />
          <CategoryCard icon="js" />
          <CategoryCard icon="tailwind" />
          <CategoryCard icon="vue" />
          <CategoryCard icon="react" />
        </div>
      </div>
    </section>
  );
};

export default Category;
