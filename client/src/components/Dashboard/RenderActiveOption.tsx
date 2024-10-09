import { useMemo } from "react";
import PostPanel from "./DashboardOption/PostPanel";
import PostEditor from "./DashboardOption/PostEditor";
import NewPost from "./DashboardOption/NewPost";
import Profile from "./DashboardOption/Profile";
import { MenuOptions } from "../../pages/Admin";

type ActiveComponentType = Record<MenuOptions, JSX.Element>;

interface Props {
  activeOption: MenuOptions;
}

const RenderActiveOption = ({ activeOption }: Props) => {
  const menuOptions: ActiveComponentType = useMemo(() => {
    return {
      postPanel: <PostPanel />,
      postEditor: <PostEditor />,
      newPost: <NewPost />,
      profile: <Profile />,
    };
  }, []);

  return menuOptions[activeOption];
};

export default RenderActiveOption;
