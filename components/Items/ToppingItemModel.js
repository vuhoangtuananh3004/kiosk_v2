import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemQuantity, substractItemQuantity } from "../../Features/itemSlice";

function ToppingItemModel({ keyValue}) {
  const dispatch = useDispatch()
  const model = useSelector(state => state.item.itemModel.model)

  //  add item quantity for the topping
  const add = (e, index) => {
    e.preventDefault();
    dispatch(addItemQuantity({keyValue: keyValue, index: index}))
  }
  //  subtract item topping quantity 
  const sub = (e, index) => {
    e.preventDefault()
    dispatch(substractItemQuantity({keyValue: keyValue, index: index}))
  }
  // Waitting for loading model from database, if it is fully loaded ==> display, otw return Loading.....
  if (!model) return <h2>Loading....</h2>
  return (
    <div className="grid grid-cols-4 h-full">
      {!model[keyValue] ? (
        <></>
      ) : (
        model[keyValue].map((doc,index) => (
          <div className="flex flex-col justify-center items-center" key={doc.name}>
            <div className="relative">
              <div className="flex flex-row font-bold ">
                <div className="p-2 w-[50px] text-center border border-white rounded-tl-[12px] rounded-bl-[12px] hover:bg-green-900/90 cursor-pointer" onClick={e => add(e, index)}>
                  +
                </div>
                <div className="p-2 w-[80px] border border-white text-center text-xl">
                  {doc.quantity}
                </div>
                <div className="p-2 w-[50px] text-center border border-white rounded-tr-[12px] rounded-br-[12px] hover:bg-red-900/90 cursor-pointer" onClick={e => sub(e, index)}>
                  -
                </div>
              </div>
            </div>
            <span>{doc.name}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default ToppingItemModel;
