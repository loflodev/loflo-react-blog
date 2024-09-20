import Button from "./Button";
import illustration from "../assets/img/illustration.png";
import { useResponsive } from "../hooks/useResponsive";

const Hero = () => {
  const breakpoint = useResponsive([768, 1024, 1310]);
  const isDesktop = breakpoint === 2 || breakpoint === 3;

  const screen = isDesktop ? "w-[75%]" : "w-[90%]"
  return (
    <section className="bg-[url('./public/Dot.png')] bg-light-grey-1">
      <div className={`flex  ${screen} m-auto pt-[185px] justify-between hero-container`}>
        {/*  call to action  */}
        <div className="flex gap-8 flex-col mb-8">
          <h1 className="text-[64px] font-bold leading-[81px] capitalize mt-2">
            Hi, I'm Louis
            <br /> FrontEnd Dev
          </h1>
          <p className="text-xl text-dark-grey leading-6 border-l-4 border-base border-solid pl-2">
            On this blog I share tips and tricks, frameworks, projects,
            tutorials, etc <br />
            Make sure you subscibe to get lastest updates
          </p>

          <div className="flex items-center justify-center gap-6">
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              className="mt-1 px-3 py-6 text-lg bg-white shadow-sm placeholder-slate-400 placeholder:text-xl focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-lg focus:ring-1"
            />
            <Button size={6}>Subscribe</Button>
          </div>
        </div>
        {/* end of call to action */}

        <div className="hero-illustration">
          <img src={illustration} alt="illustration" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
