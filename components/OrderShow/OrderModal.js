/* eslint-disable */
import { data } from "autoprefixer";
import Image from "next/image";
import React, { useState } from "react";
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch } from "react-redux";
import { addToOrder } from "../../Features/orderSlice";
function OrderModal({ doc, setModal }) {
  const dispatch = useDispatch()
  const saleTax = 10.25
  const [item, setItem] = useState()
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const [ingredients, setIngredients] = useState(doc.model);
  const [subTotal, setSubTotal] = useState(0)
  // Decrease quantity of an order, ex order 2 pizza, 1 pizza.....
  const decreaseQuantity = (e) => {
    e.preventDefault()
    if (quantity > 1) setQuantity(quantity - 1)
  }
  // Get the price when it is clicked, ex: pizza small size, medium size.
  const setPrice = (data) => {
    setItem(data)
    setSize(data.price)
  }
// Place an order button, finalize the price and then send it to order show.
  const order = (e) => {
    e.preventDefault()
    if (parseFloat(quantity*data.price) == 0) return alert('Please select size');
    let temp = {item: {...item, quantity: quantity, name: doc.name, subTotal: parseFloat(quantity*item.price)}, subTotal: parseFloat(quantity*item.price)}
    dispatch(addToOrder(temp))
    setModal(false)
  }
  return (
    <div className="absolute top-0 left-0 h-full w-full p-10 z-30 text-white">
      <div className="flex flex-col h-full w-3/4 bg-slate-900/80 rounded-[24px] overflow-auto space-y-10">
        <div className="flex flex-row justify-between items-center p-5">
          <button
            className="text-[24px] h-10 font-bold pl-5 pr-5 border border-black rounded-[24px] bg-red-500"
            onClick={() => setModal(false)}
          >
            X
          </button>
          <div className="flex flex-row space-x-5">
            <span className="text-[24px] h-10 font-bold pl-5 pr-5 border border-black rounded-[24px] bg-purple-400/50">
              {doc.name}
            </span>
            <div className="flex flex-row h-10 justify-center items-center text-center border border-white rounded-full">
              <button className="w-8 border-r-2 border-white font-bold" onClick={decreaseQuantity}>
                -
              </button>
              <span className="w-10 font-bold">{quantity}</span>
              <button className="w-8 border-l-2 border-white font-bold" onClick={() => setQuantity(quantity + 1)}>
                +
              </button>
            </div>
          </div>
          <button className="text-[24px] h-10 font-bold pl-5 pr-5  border border-black rounded-[24px] bg-green-500" onClick={order}>
            <DoneIcon fontSize="inherit"/>
          </button>
        </div>

        <div className="flex flex-row w-full justify-center items-center space-x-10">
      
          <img className="rounded-[24px] drop-shadow-xl h-[300px] w-[300px]" src={doc.imgUrl} alt="invalid URL"/>
          <div className="flex flex-col justify-center items-center space-y-5">
            <span className="text-[24px] font-bold tracking-widest">SIZE</span>
            <div className="grid grid-cols-3 gap-5">
              {doc.itemPrice.map((data) => (
                <div
                  className={`flex flex-col justify-center items-center border border-white p-3 space-y-3 font-bold tracking-wider  ${
                    (data.price == size) ? "bg-green-400/30" : ""
                  } `}
                  key={data.namePrice}
                  onClick={() => setPrice(data)}
                >
                  <span>{data.namePrice.toUpperCase()}</span>
                  <span>{data.price}$</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full justify-between p-5">
          <div className="flex flex-col w-1/2 justify-center items-center space-y-5 border-r-2 border-white">
            <span className="text-[24px] font-bold tracking-widest italic">
              INGREDIENTS
            </span>
            <div className="flex flex-col w-full justify-center items-center">
              {Object.keys(ingredients).map((key, index) =>
                ingredients[key].map((ingredient) =>
                  ingredient.quantity != 0 ? (
                    <span className="w-full text-center odd:bg-sky-400/10 p-1 font-bold tracking-wide" key={ingredient.name}>{ingredient.name}</span>
                  ) : (
                    <div key={ingredient.name}></div>
                  )
                )
              )}
            </div>
          </div>
          <div className="flex flex-col w-1/2 items-center pl-2 pr-2">
            <span className="text-[24px] font-bold tracking-widest italic">
              SPECIAL INSTRUCTION
            </span>
            <input
              className="h-full w-full rounded-[24px] bg-white text-black"
              placeholder="Note go here ...."
            />
          </div>
        </div>
        <div className="flex flex-row w-full justify-end items-center space-x-5">
          <span className=" text-[24px] font-bold tracking-widest">TOTAL: </span>
          <span className=" text-[24px] font-bold tracking-widest">{(quantity * size).toFixed(2)}$</span>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;
