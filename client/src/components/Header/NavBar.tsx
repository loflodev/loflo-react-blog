import { Link } from "react-router-dom";
import Button from "../Button";
import Modal from "../Modal";
import Login from "./Login";
import { HeaderContext } from "./Header";
import { useContext } from "react";

const NavBar = () => {
  const { toggle, handleClick } = useContext(HeaderContext);

  console.log(toggle)
  return (
    <div className="bg-light-grey-1">
      <div className="flex justify-between items-center w-[85%] m-auto py-4">
        <div className="logo-container">
          <Link to="" className="logo">
            <h1 className="font-semibold text-4xl text-logo-primary leading-5">
              LofloDev.
            </h1>
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
          <Button onClick={handleClick}>Sign in</Button>
          <Modal isModalOpen={toggle} onClick={handleClick}>
            <Login />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
