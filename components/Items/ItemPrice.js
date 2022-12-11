import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemPrice, resetPrice } from "../../Features/itemSlice";

function ItemPrice() {
  const dispatch = useDispatch()
  const item = useSelector(state => state.item.itemModel.itemPrice)
  // Item price is an object include namePrice, price, extra price
  const [priceItem, setPriceItem] = useState({
    namePrice: null,
    price: 0,
    extraPrice: 0,
  });
// add item price to redux store, which include the same model as item name and item url ( update an object)
  const add = () => {
   dispatch(addItemPrice(priceItem))
  };
// reset the price if need, ex: pizza have small, medium, large ==> we can reset the size price and remake the new one
// Then set all value in redux item store to default
  const reset = (e) => {
    e.preventDefault()
    dispatch(resetPrice())
  }

  return (
    <div className="flex flex-col h-full w-full items-center">
      <span className="text-rose-400 font-bold tracking-wider">Item Price</span>
      <div className="flex flex-row space-x-5">
        <input
          className="text-center rounded-[24px] text-white bg-white/40"
          placeholder="item size"
          onChange={(e) =>  setPriceItem({ ...priceItem, namePrice: e.target.value })}
        />
        <input
          className="text-center w-[100px] rounded-[24px] text-white bg-white/40"
          placeholder="item price"
          type="number"
          onChange={(e) =>  setPriceItem({ ...priceItem, price: e.target.value })}
        />
        <input
        className="text-center w-[100px] rounded-[24px] text-white bg-white/40"
        placeholder="extra price"
        type="number"
        onChange={(e) =>  setPriceItem({ ...priceItem, extraPrice: e.target.value })}
      />
        <button className="pl-2 pr-2 bg-green-600 rounded-[24px]" onClick={add}>
          ADD
        </button>
        <button className="pl-2 pr-2 bg-green-600 rounded-[24px]" onClick={reset}>
          RESET
        </button>
      </div>
      <div className="flex flex-row justify-center h-full w-full border-t-2 border-white mt-2 space-x-5 overflow-x-auto">
        {item.length != 0 ? (
          item.map((doc) => (
            <div className="flex flex-col justify-center items-center space-y-1 border border-white mt-2 p-1" key={doc.namePrice}>
              <span>{doc.namePrice}</span>
              <div className="flex items-center justify-center h-4 flex-row space-x-2">
                <span className="text-sm">Price:</span>
                <span>{doc.price}$</span>
              </div>
              <div className="flex items-center justify-center h-4 flex-row space-x-2">
                <span className="text-sm">Extra:</span>
                <span>{doc.extraPrice}$</span>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ItemPrice;
