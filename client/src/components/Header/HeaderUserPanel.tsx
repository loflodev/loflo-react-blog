import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import Button from "../Button";
import { logout } from "../../services/authentication";

interface HeaderUserPanelProps {
  handleSignInClick: () => void;
}

const HeaderUserPanel = ({ handleSignInClick }: HeaderUserPanelProps) => {
  const { isLogged, auth } = useContext(AuthContext);
  const handleLogout = async () => {
    window.localStorage.removeItem("loggedUserInfo");
    await logout();
    window.location.reload();
  };

  return isLogged ? (
    <div>
      <div className="dropdown px-5 py-2 rounded-2xl bg-logo-seconday text-white text-xl font-semibold">
        <div tabIndex={0} role="button" className="">
          {`Hello, ${auth.username} >`}
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
  ) : (
    <Button onClick={handleSignInClick}>Sign in</Button>
  );
};

export default HeaderUserPanel;
