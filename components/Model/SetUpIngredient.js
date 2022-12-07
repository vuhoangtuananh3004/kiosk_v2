import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SetUpToppingModel from "./SetUpToppingModel";
import ToppingModel from "./ToppingModel";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { updateNewIngredientName, deleteIngredient} from "../../Features/modelSlice";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function SetUpIngredient({ keyValue }) {
  const dispatch = useDispatch()
  const sectionTopping = useSelector((state) => state.model.sectionTopping);
  const [ingredientName, setIngredientName] = useState(false);
  const [newIngredientName, setNewIngredientName] = useState();
  const saveNewIngredientName = (e) => {
    e.preventDefault();
    dispatch(updateNewIngredientName({keyValue: keyValue, newKey: newIngredientName}))
    setIngredientName(!ingredientName)
  }
  const deleteIngredientName = (e) => {
    e.preventDefault();
    dispatch(deleteIngredient({keyValue: keyValue, newKey: newIngredientName}))
  }
  return (
    <>
      <span className=" flex flex-row p-2 font-bold text-[24px] items-center">
        {keyValue.toUpperCase()}
        {ingredientName ? (
          <>
          <input
            className="ml-2 rounded-full bg-white/80 text-[20px] text-center font-light text-black"
            placeholder="new ingredient name"
            onChange={(e)=> setNewIngredientName(e.target.value)}
          />
          <button className="font-medium text-[20px] ml-2 bg-green-900 pl-2 pr-2 rounded-[24px]" onClick={saveNewIngredientName}>Save</button>
          </>
        ) : (
          <ModeEditOutlinedIcon className="ml-5" onClick={() => setIngredientName(!ingredientName)}/>
  
        )}        
        <DeleteOutlineOutlinedIcon className="ml-5" color="error" onClick={deleteIngredientName}/>
      </span>
      <div className="grid grid-cols-4 ml-3 gap-2 place-items-start">
        {sectionTopping[keyValue].length == 0 ? (
          <></>
        ) : (
          sectionTopping[keyValue].map((doc) => (
            <ToppingModel key={doc.name} keyValue={keyValue} doc={doc} />
          ))
        )}

        <SetUpToppingModel keyValue={keyValue} />
      </div>
    </>
  );
}

export default SetUpIngredient;
