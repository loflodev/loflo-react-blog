import { DashboardIcon } from "../../assets/svg/DashboardIcon";
import { logout } from "../../services/authentication";

interface Props {
  username: string;
  setIsLogged: (value: boolean) => void;
}

const AdminMenu = ({ username, setIsLogged }: Props) => {
  const handleLogout = async () => {
    window.localStorage.removeItem("loggedUserInfo");
    await logout();
    setIsLogged(false);
  };

  return (
    <div>
      <div className="dropdown px-5 py-2 rounded-lg bg-logo-seconday text-white text-xl font-semibold">
        <div tabIndex={0} role="button" className="flex items-center gap-2 text-smcl">
          {`Welcome ${username}`}
          <DashboardIcon color={"#fff"} />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 mt-5 shadow left-0 text-base"
        >
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminMenu;
