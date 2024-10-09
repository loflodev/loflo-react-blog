import { useState } from "react";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashboardMenu from "../components/Dashboard/DashboardMenu";
import { DashboardStats } from "../components/Dashboard/DashboardStats";
import RenderActiveOption from "../components/Dashboard/RenderActiveOption";

export type MenuOptions = "postPanel" | "postEditor" | "newPost" | "profile";

const Admin = () => {
  const [activeOption, setActiveOption] = useState<MenuOptions>("postPanel");
  return (
    <div className="bg-light-grey-1">
      <div className="wrapper">
        <div className="d-container">
          <DashboardMenu setActiveOption={setActiveOption} />

          <DashboardHeader />

          <DashboardStats />

          <RenderActiveOption activeOption={activeOption} />
        </div>
      </div>
    </div>
  );
};

export default Admin;
