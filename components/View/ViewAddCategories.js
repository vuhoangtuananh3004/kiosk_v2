import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMenuCategories, updateMenuCategory } from "../../firebaseFunction";
import NavBarContext from "../Context/NavBarContext";
import ViewCategories from "./ViewCategories";

function ViewAddCategories({ nameBussiness}) {
  // Display all Categories, and can add more category if needed.
  const {setView} = useContext(NavBarContext)
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState()
  const [nameBussinessMenu, setNameBussinessMenu] = useState("");
  const categories = useSelector((state) => state.menu.categories);
  // add new category
  const addCategories = () => {
    let id = (categories.length == 0) ? 1 : categories.length + 1;
    let temp = (nameBussiness + '_' + categoryName).toLocaleUpperCase();
    addMenuCategories({ nameBussinessMenu: temp,model: {nameBussiness: nameBussiness,  id: new Date().getTime(), model:{}, categoryName: categoryName.toLocaleUpperCase()}});
  };
  return (
    <div className="flex h-3/4 w-full justify-center items-center">
      <div className="flex flex-col h-3/4 w-2/3 bg-slate-900/60 rounded-[24px] p-5 text-center overflow-scroll divide-y divide-dashed">
        <div className="h-4/5 w-full"><ViewCategories value={categories}/></div>
        <div className="flex h-1/5 w-full justify-center items-center space-x-10">
          <input className="h-10 w-60 bg-white/90 rounded-[24px] text-center text-black" placeholder="Category Name" onChange={(e)=> setCategoryName(e.target.value)}></input>
          <button className="h-10 pl-5 pr-5 border border-white bg-green-900 rounded-[24px]" onClick={addCategories}>Add Category</button>
          <button className="h-10 pl-5 pr-5 border border-white bg-red-900 rounded-[24px]" onClick={()=> setView('')}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default ViewAddCategories;
