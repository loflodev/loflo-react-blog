import Button from "../../Button";

const CallToAction = () => {
  return (
    <div className="flex gap-8 flex-col mb-8">
      <h1 className="heading-1">
        Hi, I'm Louis
        <br /> FrontEnd Dev
      </h1>
      <p className="paragraph">
        On this blog I share tips and tricks, frameworks, projects, tutorials,
        etc <br />
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
  );
};

export default CallToAction;
