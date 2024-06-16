import Button from "../Button";

const Navbar = () => {
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

        
          <ul className="flex justify-end font-bold text-xl gap-12 grow mr-12 2xl:hidden">
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
        <Button>Sign in</Button>
      </div>
    </div>
  );
};

export default Navbar;
