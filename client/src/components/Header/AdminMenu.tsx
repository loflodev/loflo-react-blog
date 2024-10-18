import { Link } from "react-router-dom";
import { DashboardIcon } from "../../assets/svg/DashboardIcon";
import { LogoutIcon } from "../../assets/svg/LogoutIcon";
import { usePersistentLogin } from "../../hooks/usePersistentLogin";

interface Props {
  username: string;
}

const AdminMenu = ({ username }: Props) => {
  const { signOut } = usePersistentLogin();
  const handleLogout = async () => {
    signOut();
  };

  return (
    <div className="flex items-center gap-4">
      <div>
        <p className="font-semibold text-xl italic">{`Hi, ${username}`}</p>
      </div>
      <div className="dropdown px-2 py-2 rounded-md bg-logo-seconday hover:bg-btn-hover">
        <div tabIndex={0} role="button" className="flex items-center gap-2">
          <DashboardIcon color={"#fff"} />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 right-0 mt-5 shadow text-base"
        >
          <div className="flex justify-between px-4 py-2">
            <div className="font-semibold hover:font-bold">
              <Link to="/admin">Dashboard</Link>
            </div>
            <div
              className="cursor-pointer hover:bg-dark-grey"
              onClick={handleLogout}
            >
              <LogoutIcon width={20} height={20} color="#2b2c34" />
            </div>
          </div>
          <div className="px-4 dash-menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/category">Category</Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default AdminMenu;
