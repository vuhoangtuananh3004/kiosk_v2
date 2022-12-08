 /* eslint-disable */ 
import React, { useContext } from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import { useDispatch, useSelector } from "react-redux";
import { switchStation } from "../../Features/stationSlice";
import NavBarContext from "../Context/NavBarContext";
import { useRouter } from "next/router";
function ChangeStation() {
  const {openNavBarSlide,setNavBarSlide} = useContext(NavBarContext)
  const user = useSelector(state => state.account.user)
  const router = useRouter()
  const dispatch = useDispatch()
  const change = (data) => {
    let path = "/makeline/" + user.nameBussiness
    if (data == "MAKELINE") router.push({pathname:path, query:{email: user.email, name: user.nameBussiness}})
    else dispatch(switchStation(data))
    setNavBarSlide(!openNavBarSlide)
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
