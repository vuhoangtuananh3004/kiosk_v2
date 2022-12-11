import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateToppings } from "../../Features/modelSlice";

function SetUpToppingModel({keyValue}) {
  const dispatch = useDispatch()
    const [toppingName, setToppingName] = useState()
  // In each category will have their own model ==> add model and topping for each category
    const addTopping = (e) => {
      e.preventDefault();
      let toppingTemp ={name: toppingName, quantity: 0}
      dispatch(updateToppings({keyValue: keyValue, newTopping: toppingTemp}))
    }
  return (
      <div className="flex flex-row justify-center items-center">
        <input className="w-[150px] rounded-tl-[24px] rounded-bl-[24px] text-black text-center p-2 text-xl outline-none" placeholder="Topping name" onChange={(e) => setToppingName(e.target.value)}/>
        <button className="w-[70px]  bg-green-900 text-xl p-2 rounded-tr-[24px] rounded-br-[24px]" onClick={addTopping}>ADD</button>
      </div>
  );
}

export default SetUpToppingModel;
