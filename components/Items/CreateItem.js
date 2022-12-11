/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ImageSearchSharpIcon from "@mui/icons-material/ImageSearchSharp";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ItemPrice from "./ItemPrice";
import ToppingItem from "./ToppingItem";
import { useDispatch, useSelector } from "react-redux";
import {
  resetState,
  setImg,
  setName,
  updateModel,
} from "../../Features/itemSlice";
import { saveItemToDataBase } from "../../firebaseFunction";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import db from "../../firebaseConfig";
import { reload } from "../../Features/menuSlice";

function CreateItem({ setItemMode, view, setView }) {
  const [imgUrl, setImgUrl] = useState();
  const [imgUrlMode, setImgUrlMode] = useState(true);
  const [itemName, setItemName] = useState();
  const [itemNameMode, setItemNameMode] = useState(true);
  const user = useSelector((state) => state.account.user);
  const dispatch = useDispatch();
  // Get Item model from itemSlice
  const model = useSelector((state) => state.item.itemModel);
  // Store img url value to redux store, and use it whenever it is called
  const setReduxImgUrl = () => {
    dispatch(setImg(imgUrl));
    setImgUrlMode(!imgUrlMode);
  };
   // Store item name value to redux store, and use it whenever it is called
  const setReduxItemName = () => {
    let categoryBussinessName = view.nameBussiness + view.categoryName;
    dispatch(setName({ name: itemName, categoryName: categoryBussinessName }));
    setItemNameMode(!itemNameMode);
  };
  // Before store to database, double check if any information was missing => send alert if blank found, otw store it to database
  // After store close the create item window.
  const saveTodDatabase = (e) => {
    e.preventDefault();
    let error = 0;
    Object.keys(model).map((key, index) => {
      if (model[key] == "") error = error + 1;
    });
    if (error != 0) return alert("Please fill the empty blank, createItem_36");
    let temp = view.nameBussiness + model.name;
    saveItemToDataBase(temp, model);
    setItemMode(false);
  };
  return (
    <div className="flex flex-col h-full w-full bg-slate-900/60 divide-y divide-dashed overflow-auto">
      <span className="text-center p-2 font-bold text-[24px] tracking-widest">
        {view.categoryName} ITEM
      </span>
      <div className="flex flex-col h-full w-full">
        <div className="flex flex-col w-full p-2 space-y-5 ">
          <div className="flex flex-row justify-center h-[150px] space-x-5">
            <img
              src={imgUrl}
              className="h-[150px] w-[200px] text-[24px] mt-5 rounded-[24px] border border-white"
              alt="invalid url"
            />
            <div className="flex flex-col justify-center h-full mt-5 space-y-5">
              <span className="flex items-center">
                {imgUrlMode ? (
                  <>
                    <input
                      className="rounded-[24px] p-1 text-center text-black"
                      placeholder="image url"
                      onChange={(e) => setImgUrl(e.target.value)}
                    />
                    <ImageSearchSharpIcon
                      onClick={setReduxImgUrl}
                      className="cursor-pointer"
                    />
                  </>
                ) : (
                  <ImageSearchSharpIcon
                    onClick={() => setImgUrlMode(!imgUrlMode)}
                    className="cursor-pointer"
                  />
                )}
              </span>
              <span className="flex items-center">
                {itemNameMode ? (
                  <>
                    <input
                      className="rounded-[24px] p-1 text-center text-black"
                      placeholder={`${view.categoryName.toLowerCase()} name`}
                      onChange={(e) => setItemName(e.target.value)}
                    />
                    <ModeEditOutlineOutlinedIcon
                      onClick={setReduxItemName}
                      className="cursor-pointer"
                    />
                  </>
                ) : (
                  <>
                    {itemName}
                    <ModeEditOutlineOutlinedIcon
                      onClick={() => setItemNameMode(!itemNameMode)}
                      className="cursor-pointer"
                    />
                  </>
                )}
              </span>
            </div>
            <div className="flex flex-col h-full w-full ">
              <ItemPrice />
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full w-full mt-5 overflow-auto-y">
          <ToppingItem />
        </div>
      </div>
      <div className="flex flex-row h-[100px] w-full justify-center items-center space-x-10">
        <span
          className="p-2 pl-5 pr-5 rounded-[24px] bg-green-800/90 font-bold shadow-sm shadow-white/50 cursor-pointer"
          onClick={saveTodDatabase}
        >
          SAVE TO DATABASE
        </span>
        <span
          className="p-2 pl-5 pr-5 rounded-[24px] bg-red-800/90 font-bold shadow-sm shadow-white/50 cursor-pointer"
          onClick={() => setItemMode(false)}
        >
          CLOSE
        </span>
      </div>
    </div>
  );
}

export default CreateItem;
