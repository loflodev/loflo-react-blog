import { DashboardIcon } from "../../assets/svg/DashboardIcon";
import { NewPostIcon } from "../../assets/svg/NewPostIcon";
import { ProfileIcon } from "../../assets/svg/ProfileIcon";
import { MenuOptions } from "../../pages/Admin";

interface Props {
  setActiveOption: (value: MenuOptions) => void;
}

interface MenuType {
  icon: JSX.Element;
  title: string;
  isActive: () => void;
}
const DashboardMenu = ({ setActiveOption }: Props) => {
  const menu: MenuType[] = [
    {
      icon: <DashboardIcon />,
      title: "Admin Panel",
      isActive: () => setActiveOption("postPanel"),
    },
    {
      icon: <ProfileIcon />,
      title: "My Profile",
      isActive: () => setActiveOption("profile"),
    },
    {
     icon: <NewPostIcon />,
     title: "New Post",
     isActive: () => setActiveOption("newPost"),
   },
  ];

  return (
    <div className="pt-2 pl-2 sidebar border rounded-md shadow">
      <ul className="menu bg-base-200 rounded-box w-56">
        {menu.map((item) => (
          <li>
            <a onClick={item.isActive}>
              {item.icon}
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardMenu;
