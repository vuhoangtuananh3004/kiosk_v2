import React from "react";
import { useSelector } from "react-redux";
import ToppingItemModel from "./ToppingItemModel";

function ToppingItem() {
  // Get model of an item from itemModel store
  const model = useSelector(state => state.item.itemModel.model)
  return (
    <div className="flex flex-col">
      <div className="flex flex-col h-[650px] p-5 mt-2 overflow-auto bg-slate-400/20">
        {Object.keys(model).map((key) => (
          <div className="p-2" key={key}>
            <span className="font-bold text-xl tracking-widest">{key.toUpperCase()}</span> 
              <ToppingItemModel keyValue={key} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToppingItem;
