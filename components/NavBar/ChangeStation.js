 /* eslint-disable */ 
import React, { useContext } from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import { useDispatch } from "react-redux";
import { switchStation } from "../../Features/stationSlice";
import NavBarContext from "../Context/NavBarContext";
function ChangeStation() {
  const {openNavBarSlide,setNavBarSlide} = useContext(NavBarContext)
  const dispatch = useDispatch()
  const change = (data) => {
    setNavBarSlide(!openNavBarSlide)
    dispatch(switchStation(data))
  }
  return (
    <div className="flex flex-col justify-center items-center h-full w-full space-y-5">
      <div className="flex flex-row justify-center items-center text-[32px] w-[400px] font-bold space-x-5 border border-black p-5 rounded-[24px] bg-purple-900/20 hover:translate-x-5 cursor-pointer" onClick={()=>change("MANAGER")}>
        <ManageAccountsIcon fontSize="inherit" />
        <span>Manager Station</span>
      </div>
      <div className="flex flex-row justify-center items-center text-[32px] w-[400px] font-bold space-x-5 border border-black p-5 rounded-[24px] bg-green-900/20 hover:translate-x-5 cursor-pointer" onClick={()=>change("ORDER")}>
        <RestaurantMenuIcon fontSize="inherit" />
        <span>Order Station</span>
      </div>
      <div className="flex flex-row justify-center items-center text-[32px] w-[400px] font-bold space-x-5 border border-black p-5 rounded-[24px] bg-yellow-900/20 hover:translate-x-5 cursor-pointer" onClick={()=>change("MAKELINE")}>
        <OutdoorGrillIcon fontSize="inherit" />
        <span>Make Line Station</span>
      </div>
    </div>
  );
}

export default ChangeStation;
