
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToppings } from "../../Features/modelSlice";

function ToppingModel({ keyValue,doc }) {
  const dispatch = useDispatch()

  // Remove the topping from the model
  const remove = (e) => {
    e.preventDefault();
    dispatch(removeToppings({keyValue: keyValue, name: doc.name}))
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative">
        <div className="flex flex-row font-bold ">
          <div className="p-2 w-[50px] text-center border border-white rounded-tl-[12px] rounded-bl-[12px] hover:bg-green-900/90 cursor-pointer">
            +
          </div>
          <div className="p-2 w-[80px] border border-white text-center text-xl">
            0
          </div>
          <div className="p-2 w-[50px] text-center border border-white rounded-tr-[12px] rounded-br-[12px] hover:bg-red-900/90 cursor-pointer">
            -
          </div>
        </div>
        <button className="absolute -top-3 right-0 font-bold text-red-300" onClick={remove}>X</button>
      </div>
      <span>{doc.name}</span>
    </div>
  );
}

export default ToppingModel;
