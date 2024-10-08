import { Player } from "@lottiefiles/react-lottie-player";
import heart from "../../../../public/heartHome.png";
import circleHeartRate from "../../../../public/circleHeartRateHome.png";
import circleHeart from "../../../../public/circleHeartHome.png";
import { ArrowUpRight } from "lucide-react";
const Home = () => {
  return (
    <section className="px-14 pt-6 relative 2xl:px-44 2xl:pt-20 ">
      <div className="">
        <h1 className="text-[40px] font-semibold text-center md:text-start md:text-[100px]">
          <span className="text-light-primary mr-2 md:mr-5">Enhancing</span>
          <span className="block md:hidden">
            <pre></pre>
          </span>
          Healthcare <span className="hidden 2xl:block"><pre></pre></span>Access For All
        </h1>

        <p className="hidden md:block w-[800px] text-light-txtOpacity tracking-widest">
          Critical goal that requires a multifaceted approach involving policy
          changes, infrastructure improvements, and community engagement One key
          strategy is to address the underlying factors that limit access, such
          as geographic barriers, cost concerns, and lack of healthcare
          facilities.
        </p>

        <div className="flex flex-col mt-4 items-center md:absolute md:items-end right-24 top-52 2xl:right-60 2xl:top-64">
          <button className="border-2 border-light-text w-fit px-7 py-1 mb-3 rounded-[20px] font-semibold flex flex-row hover:bg-light-text hover:text-light-bg duration-700">
            Learn More
            <ArrowUpRight className="ml-2 " size={24} />
          </button>
          <button className="border-2 border-light-primary bg-light-primary text-light-secondary w-fit px-7 py-1 rounded-[20px] font-semibold hover:bg-light-bg hover:text-light-primary duration-700">
            Book Appoinment
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center md:hidden">
        <img className="size-56" src={heart} alt="Heart" />
        <Player
          className=""
          autoplay
          loop
          src="../../../../public/heartRateHome.json"
        />
      </div>
      <div className="hidden md:flex flex-row justify-between">
        <div className="hidden md:flex flex-row justify-between mt-5">
          <div className="relative w-1/2 ml-[-56px]">
            <img
              className="w-[600px] h-auto 2xl:w-[900px] 2xl:ml-[-125px] 2xl:mt-7"
              src={circleHeartRate}
              alt="Heart"
            />
            <Player
              className="absolute top-32 left-[-127px] 2xl:top-52 2xl:h-auto 2xl:w-64"
              autoplay
              loop
              src="../../../../public/heartRateHome.json"
            />
          </div>
        </div>
        <div className="relative w-1/2">
          <img className="w-[600px] h-auto 2xl:w-full 2xl:mt-6" src={circleHeart} alt="Heart" />
          <img
            className="h-auto w-[370px] absolute bottom-0 right-12 rotate-12 2xl:w-[490px]"
            src={heart}
            alt="Heart"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;

