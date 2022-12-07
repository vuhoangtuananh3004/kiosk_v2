/* eslint-disable */
import { data } from "autoprefixer";
import Image from "next/image";
import React, { useState } from "react";

function OrderModal({ doc, setModal }) {
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [ingredients, setIngredients] = useState(doc.model);
  const [totalPrice, setTotalPrice] = useState()
  
  return (
    <div className="absolute top-0 left-0 h-full w-full p-10 z-30 text-white">
      <div className="flex flex-col h-full w-3/4 bg-slate-900/80 rounded-[24px] overflow-auto space-y-10">
        <div className="flex flex-row justify-between items-center p-5">
          <button
            className="text-[24px] h-10 font-bold pl-5 pr-5 border border-black rounded-[24px] bg-red-400/50"
            onClick={() => setModal(false)}
          >
            X
          </button>
          <div className="flex flex-row space-x-5">
            <span className="text-[24px] h-10 font-bold pl-5 pr-5 border border-black rounded-[24px] bg-purple-400/50">
              {doc.name}
            </span>
            <div className="flex flex-row h-10 justify-center items-center text-center border border-white rounded-full">
              <button className="w-8 border-r-2 border-white font-bold">
                -
              </button>
              <span className="w-10 font-bold">{quantity}</span>
              <button className="w-8 border-l-2 border-white font-bold">
                +
              </button>
            </div>
          </div>
          <button className="text-[24px] h-10 font-bold pl-5 pr-5  border border-black rounded-[24px] bg-green-400/50">
            {"=>"}
          </button>
        </div>

        <div className="flex flex-row w-full justify-center items-center space-x-10">
          <Image
            className="rounded-[24px] drop-shadow-xl"
            src={doc.imgUrl}
            alt="invalid URL"
            height={300}
            width={300}
          />
          <div className="flex flex-col justify-center items-center space-y-5">
            <span className="text-[24px] font-bold tracking-widest">SIZE</span>
            <div className="grid grid-cols-3 gap-5">
              {doc.itemPrice.map((data) => (
                <div
                  className={`flex flex-col justify-center items-center border border-white p-3 space-y-3 font-bold tracking-wider  ${
                    data.price == size ? "bg-green-400/30" : ""
                  } `}
                  key={data.namePrice}
                  onClick={() => setSize(data.price)}
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
                    <span className="w-full text-center odd:bg-sky-400/20 even:bg-yellow-200/20 p-1">{ingredient.name}</span>
                  ) : (
                    <></>
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
              className="h-full w-full rounded-[24px] bg-white/50 text-black"
              placeholder="Note go here ...."
            />
          </div>
        </div>
        <div className="flex flex-row w-full justify-end items-center space-x-5">
          <span className=" text-[24px] font-bold tracking-widest">TOTAL: </span>
          <span className=" text-[24px] font-bold tracking-widest">{quantity * size}$</span>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;
