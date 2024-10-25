import { Link } from "react-router-dom";
import { DashboardIcon } from "../../assets/svg/DashboardIcon";
import { User } from "../../helpers/types";
interface Props {
  user: Omit<User, "password"> | null;
  logout: () => void;
}

const AdminMenu = ({ user, logout }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <div>
        <p className="font-semibold text-xl italic">{`Hi, ${user?.username}`}</p>
      </div>
      <div className="dropdown px-2 py-2 rounded-md bg-logo-seconday hover:bg-btn-hover">
        <div tabIndex={0} role="button" className="flex items-center gap-2">
          <DashboardIcon color={"#fff"} />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 right-0 mt-5 shadow text-base"
        >
          <div className="px-4 py-2">
            <div className="flex justify-between">
              {user?.role === "admin" && (
                <div className="flex flex-col">
                  <div className="font-semibold hover:font-bold">
                    <Link to="/admin">Dashboard</Link>
                  </div>

                  <div className="px-1">
                    <li>
                      <Link to="/admin">Panel</Link>
                    </li>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between show-menu">
              <div className="flex flex-col">
                <div className="font-semibold hover:font-bold">
                  <Link to="#">Menu</Link>
                </div>

                <div className="px-1">
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
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col">
                <div>
                  <p className="font-semibold hover:font-bold">Profile</p>
                </div>

                <div className="px-1">
                  <li>
                    <Link to="/">My Profile</Link>
                  </li>
                  <li>
                    <Link to="#" onClick={logout}>
                      Logout
                    </Link>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default AdminMenu;
