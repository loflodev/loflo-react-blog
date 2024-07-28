import { Link } from "react-router-dom";
import Icons from "./Icons";

const Footer = () => {
  return (
    <footer className="bg-light-grey-2">
      <div className="flex w-[85%] m-auto pt-16 pb-12 justify-between border-b-2 border-b-[#C0C0C0] flex-wrap">
        <div className="flex gap-5 flex-col mb-4">
          <div className="logo">
            <Link
              to={"/"}
              className="font-semibold text-4xl text-logo-primary leading-5"
            >
              Dasteen
              <span className="font-bold text-logo-seconday text-lg leading-6">
                .Blog
              </span>
            </Link>
          </div>
          <p>Digitaldastin by Dastin Darmawan</p>

          <div className="flex gap-4 items-center">
            <Icons iconName="medium" w={7} h={7} />
            <Icons iconName="twitter" w={7} h={5} />
            <Icons iconName="instagram" w={7} h={7} />
            <Icons iconName="linkedin" w={7} h={7} />
          </div>
        </div>

        <div className="w-[60%] flex justify-between gap-4 flex-wrap">
          <nav className="flex flex-col gap-5">
            <h4 className="font-bold text-xl leading-6 uppercase mb-1">
              Category
            </h4>
            <Link to="#">CSS</Link>
            <Link to="#">JavaScript</Link>
            <Link to="#">Tailwind</Link>
            <Link to="#">React JS</Link>
            <Link to="#">More category</Link>
          </nav>

          <nav className="flex flex-col gap-5">
            <h4 className="font-bold text-xl leading-6 uppercase mb-1">
              About Us
            </h4>
            <Link to="#">About us</Link>
            <Link to="#">Projects</Link>
            <Link to="#">Achievements</Link>
          </nav>

          <nav className="flex flex-col gap-5">
            <h4 className="font-bold text-xl leading-6 uppercase mb-1">
              Get in touch
            </h4>
            <Link to="#">+829 791 3210</Link>
            <Link to="#">louis@gmail.com</Link>
          </nav>

          <nav className="flex flex-col gap-5">
            <h4 className="font-bold text-xl leading-6 uppercase mb-1">
              Follow us
            </h4>
            <Link to="#">Medium</Link>
            <Link to="#">Twitter</Link>
            <Link to="#">Instagram</Link>
            <Link to="#">Facebook</Link>
          </nav>
        </div>
      </div>
      <div className="flex w-[85%] m-auto justify-between py-6 text-sm leading-5 text-[#2B2C34]">
        <p>© 2024 Digitaldastin</p>
        <p>Made With ❤️ Jakarta, Haiti</p>
      </div>
    </footer>
  );
};

export default Footer;
