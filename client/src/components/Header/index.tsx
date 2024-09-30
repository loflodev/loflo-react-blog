import { Link } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import RegisterForm from "../RegisterForm";
import LoginForm from "../LoginForm";
import Modal from "../Modal";
import HeaderContext from "../../context/HeaderProvider";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import Button from "../Button";

const Header = () => {
  const { handleClick, toggle, showRegistration } = useContext(HeaderContext);
  const { auth, isLogged } = useContext(AuthContext);
  const [reload, setReload] = useState(false);

  const showAdmin = Boolean(reload) && Boolean(isLogged);

  return (
    <div className="bg-light-grey-1">
      <div className={`flex justify-between items-center wrapper py-4`}>
        <div className="logo-container">
          <Link to="">
            <p className="logo">LofloDev &#x276F;</p>
          </Link>
        </div>

        {/* menu for desktop and tablet */}
        <nav className="hidden lg:flex justify-end font-bold text-xl gap-12 grow mr-12">
          <Link to="/">Home</Link>
          <Link to="/category">Category</Link>
          <Link to="/about">About Us</Link>
          <Link to="/search">Search</Link>
        </nav>

        {/* menu for mobile */}
        <div className="flex ml-auto">
          <div className="lg:hidden dropdown dropdown-bottom dropdown-end mr-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <nav
              tabIndex={0}
              className="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
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
            </nav>
          </div>
          {showAdmin ? (
            <AdminMenu username={auth.username} setReload={setReload} />
          ) : (
            <Button onClick={handleClick}>Sign in</Button>
          )}

          <Modal isModalOpen={toggle} onClick={handleClick}>
            {showRegistration ? (
              <RegisterForm />
            ) : (
              <LoginForm setReload={setReload} />
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Header;
