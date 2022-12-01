import React, { useContext } from "react";
import { useSelector } from "react-redux";
import NavBarContext from "../Context/NavBarContext";
import MenuAddSection from "./MenuAddSection";

function MenuSlide() {
  const {setView} = useContext(NavBarContext)
  const categories = useSelector((state) => state.menu.categories);
  return (
    <div className="flex flex-row items-center h-[70px] w-full bg-white/80 p-4 text-black space-x-10 overflow-auto">
      {categories.map((doc) => (
        <button
          className="border-2 border-black p-4 font-bold rounded-[24px]"
          type="submit"
          key={doc.categoryName}
          onClick={()=> setView(doc)}
        >
          {doc.categoryName}
        </button>
      ))}

      <MenuAddSection />
    </div>
  );
}

export default MenuSlide;
