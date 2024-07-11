import { useState } from "react";
import Button from "../Button";
import Modal from "../Modal";

const Navbar = () => {

  const [toggle, setToggle] = useState<boolean>(false);

  const handleClick = () => {
    setToggle(!toggle);
  }


  return (
    <div className="bg-light-grey-1">
      <div className="flex justify-between items-center w-[85%] m-auto py-4">
        <div className="logo-container">
          <a href="" className="logo">
            <h1 className="font-semibold text-4xl text-logo-primary leading-5">
              Dasteen.
            </h1>
          </a>
        </div>

        <ul className="hidden lg:flex justify-end font-bold text-xl gap-12 grow mr-12">
          <li>
            <a href=""></a>Home
          </li>
          <li>
            <a href=""></a>Category
          </li>
          <li>
            <a href=""></a>About Me
          </li>
          <li>
            <a href=""></a>Search
          </li>
        </ul>

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
            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Homepage</a>
              </li>
              <li>
                <a>Portfolio</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
          <Button onClick={handleClick}>Sign in</Button>
        </div>
      </div>
      <Modal isModalOpen={toggle} onClick={handleClick} />
    </div>
  );
};

export default Navbar;
