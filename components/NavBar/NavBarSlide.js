import React, { useContext, useState } from "react";
import ChangeStation from "./ChangeStation";
import OrderHistory from "./OrderHistory";
import SaleReport from "./SaleReport";
import UserProfile from "./UserProfile";
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';
import NavBarContext from "../Context/NavBarContext";

function NavBarSlide() {
const {openNavBarSlide,setNavBarSlide} = useContext(NavBarContext)
  const [userProfile, saleReport, orderHistory, changeStation] = [
    "USER PROFILE",
    "SALE REPORT",
    "ORDER HISTORY",
    "CHANGE STATION",
  ];
  const [openMenu, setOpenMenu] = useState(userProfile);
  return (
    <div className="absolute h-full w-full bg-white/80 text-black">
    <div className="absolute top-0 left-3 text-[56px] cursor-pointer" onClick={()=> setNavBarSlide(!openNavBarSlide)}><CancelPresentationRoundedIcon fontSize="inherit"/></div>
      <div className="flex h-full w-full">
        <div className="flex flex-col h-full w-1/4 justify-center items-center border-r-2 border-black divide-y divide-black">
          <span
            className="text-center w-full text-[24px] hover:font-bold tracking-wider p-4 cursor-pointer"
            onClick={() => setOpenMenu(userProfile)}
          >
            {userProfile}
          </span>
          <span className="text-center w-full text-[24px] hover:font-bold tracking-wider p-4 cursor-pointer" onClick={() => setOpenMenu(saleReport)}>
            {saleReport}
          </span>
          <span className="text-center w-full text-[24px] hover:font-bold tracking-wider p-4 cursor-pointer" onClick={() => setOpenMenu(orderHistory)}>
            {orderHistory}
          </span>
          <span className="text-center w-full text-[24px] hover:font-bold tracking-wider p-4 cursor-pointer" onClick={() => setOpenMenu(changeStation)}>
            {changeStation}
          </span>
          <span className="text-center w-full text-[24px] hover:font-bold tracking-wider p-4 underline cursor-pointer italic">
            SIGN OUT
          </span>
        </div>
        <div className="h-full w-3/4">
          {(openMenu == userProfile) ? <UserProfile/> : <></>}
          {(openMenu == saleReport) ? <SaleReport/> : <></>}
          {(openMenu == orderHistory) ? <OrderHistory/> : <></>}
          {(openMenu == changeStation) ? <ChangeStation/> : <></>}
        </div>
      </div>
    </div>
  );
}

export default NavBarSlide;
