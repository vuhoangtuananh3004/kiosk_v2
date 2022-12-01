import React, { useContext, useState } from "react";
import NavBarContext from "../Context/NavBarContext";


function Hamburger() {
  const {openNavBarSlide,setNavBarSlide} = useContext(NavBarContext)

  const [menu, setOpenMenu] = useState(false);
  return (
    <div className="flex flex-col h-full items-center justify-center pl-10 pr-10 cursor-pointer text-white z-100">
      <div className="absolute" id="closeMenu" onClick={()=> setNavBarSlide(!openNavBarSlide)}>
        <div className="w-[25px]  border-b-4 border-white "></div>
        <div className="w-[25px]  border-b-4 border-white mt-1"></div>
        <div className="w-[25px]  border-b-4 border-white mt-1"></div>
      </div>
    </div>
  );
}

export default Hamburger;