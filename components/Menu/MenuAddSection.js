import React, { useContext } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import NavBarContext from "../Context/NavBarContext";
function MenuAddSection() {
  // The model for add section 
    const [viewAddMenuSection] = ["ADD_MENU_SECTION"];
    const {openNavBarSlide, setView} = useContext(NavBarContext)
  return (
    <div className="flex justify-center items-center border-2 border-dashed border-black p-4 font-bold rounded-[24px] cursor-pointer" onClick={() => setView(viewAddMenuSection)}>
      <AddRoundedIcon />
    </div>
  );
}

export default MenuAddSection;
