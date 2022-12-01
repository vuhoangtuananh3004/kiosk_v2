import React, { useContext } from "react";
import Hamburger from "./Hamburger";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import NavBarContext from "../Context/NavBarContext";

function NavBarTop(props) {
  return (
    <div className="flex justify-between items-center h-[100px] w-full bg-green-600/80 text-white font-bold text-[24px] shadow-xl shadow-white/10">
      <Hamburger/>
      <div className="flex h-full w-full items-center">
          <div className="flex justify-center items-center h-full w-100 odd:border-4 border-indigo-200/0 border-x-white pl-10 pr-10">Order</div>
      </div>
      <div className="flex flex-col justify-center items-center h-full w-[200px]">
        <span>{new Date().toLocaleDateString()}</span>
        <span>Register 1</span>
      </div>
      <button className="text-[36px]" onClick={props.handle.enter}><FullscreenIcon fontSize="inherit"/></button>
    </div>
  );
}

export default NavBarTop;
