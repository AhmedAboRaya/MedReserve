import { NavLink } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import "./navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className=" flex flex-row mt-2 justify-between items-center mx-4">
        <div>
          <NavLink className="flex flex-row font-bold text-xl">
            <Player
              className="logo"
              loop
              autoplay
              src="../../../../public/logo.json"
            />
            MedReserve
          </NavLink>
        </div>
        <div className="hidden md:flex justify-between w-1/2">
          <NavLink to={"/home"} className="mr-3 ">
            Home
          </NavLink>
          <NavLink to={"/about"} className="mr-3">
            About
          </NavLink>
          <NavLink to={"/services"} className="mr-3">
            Services
          </NavLink>
          <NavLink to={"/experts"} className="mr-3">
            Experts
          </NavLink>
          <NavLink to={"/contact"} className="mr-3">
            Contact
          </NavLink>
        </div>
        <div className="hidden md:block">
          <NavLink to={"/login"} className="mr-3 px-10 py-1 font-semibold rounded-[20px] bg-light-primary text-dark-text ">
            Login
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
