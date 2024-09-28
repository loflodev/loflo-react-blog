import illustration from "../../../assets/img/illustration.png";
import CallToAction from "./CallToAction";

const Hero = () => {
  return (
    <section className="bg-[url('./Dot.png')] bg-light-grey-1">
      <div
        className={`flex  wrapper pt-[185px] justify-between hero-container`}
      >
        <CallToAction />

        <div className="hero-illustration">
          <img src={illustration} alt="illustration" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
