import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSectionTopping, setSectionToppings } from "../../Features/modelSlice";
import { saveModelToDataBase } from "../../firebaseFunction";
import SetUpIngredient from "./SetUpIngredient";

function SetUpModel({ setEditMode, view, setView}) {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.menu)
  const sectionToppings = useSelector(state => state.model.sectionTopping)
  const [ingredient, setIngredient] = useState();
// load model base on category was selected
  useEffect(()=>{
    if (categories.isLoading){
        let temp = {...categories.categories.filter(el => el.categoryName == view.categoryName)}
         dispatch(loadSectionTopping(temp[0].model))
    }
  },[categories, dispatch, view.categoryName])
// add new Section/Category
  const addSection = (e) => {
    console.log(sectionToppings);
    e.preventDefault();
    let obj = {};
    obj[ingredient] = [];
    dispatch(setSectionToppings(obj))
  };
  // after add then save to database
  const saveToDatabase = (e) => {
    e.preventDefault();
    let nameCategory = view.nameBussiness +"_" + view.categoryName;
    saveModelToDataBase(nameCategory, sectionToppings);
    setView("")
  };
  return (
    <div className="flex flex-col h-full w-full bg-slate-900/60 overflow-auto divide-y divide-dashed">
      <span className="text-center p-5 font-bold text-[24px] tracking-widest">
        {view.categoryName} MODEL
      </span>
      <div className="flex h-full w-full ">
        <div className="flex flex-col h-[700px] w-full ml-5 space-y-5 overflow-auto">

        {!sectionToppings ? <></> :  
          Object.keys(sectionToppings).map((key) => (
            <SetUpIngredient key={key} keyValue={key}/>
            ))}
        </div>
      </div>
      <div className="flex flex-row h-[100px] w-full justify-center items-center space-x-10">
        <input
          className="p-2 rounded-[24px] text-center text-black"
          placeholder="Add new Ingredient"
          onChange={(e) => setIngredient(e.target.value)}
        />
        <span
          className="p-2 pl-5 pr-5 rounded-[24px] bg-yellow-100/90 font-bold text-rose-900 shadow-sm shadow-white/50"
          onClick={addSection}
        >
          ADD
        </span>
        <span
          className="p-2 pl-5 pr-5 rounded-[24px] bg-green-800/90 font-bold shadow-sm shadow-white/50"
          onClick={saveToDatabase}
        >
          SAVE TO DATABASE
        </span>
        <span
        className="p-2 pl-5 pr-5 rounded-[24px] bg-red-800/90 font-bold shadow-sm shadow-white/50" onClick={()=>setEditMode(false)}
      >
        CLOSE
      </span>
      </div>
    </div>
  );
}

export default SetUpModel;
