/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ImageSearchSharpIcon from "@mui/icons-material/ImageSearchSharp";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ItemPrice from "./ItemPrice";
import ToppingItem from "./ToppingItem";
import { useDispatch, useSelector } from "react-redux";
import { resetState, setImg, setName } from "../../Features/itemSlice";
import { saveItemToDataBase } from "../../firebaseFunction";

function CreateItem({ setItemMode, view }) {
  const [imgUrl, setImgUrl] = useState();
  const [imgUrlMode, setImgUrlMode] = useState(true);
  const [itemName, setItemName] = useState();
  const [itemNameMode, setItemNameMode] = useState(true);
  const dispatch = useDispatch();
  const model = useSelector(state => state.item.itemModel)

  const setReduxImgUrl = () => {
    dispatch(setImg(imgUrl))
    setImgUrlMode(!imgUrlMode)
  }
  const setReduxItemName = () => {
     let categoryBussinessName = view.nameBussiness + view.categoryName;
     dispatch(setName({name: itemName, categoryName: categoryBussinessName}))
     setItemNameMode(!itemNameMode)

  }
  const saveTodDatabase = (e) => {
    e.preventDefault();
    let temp = view.nameBussiness + model.name
    saveItemToDataBase(temp, model)
    setItemMode(false)
  }
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
              <ItemPrice/>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full w-full mt-5 overflow-auto-y"><ToppingItem/></div>
      </div>
      <div className="flex flex-row h-[100px] w-full justify-center items-center space-x-10">
        <span className="p-2 pl-5 pr-5 rounded-[24px] bg-green-800/90 font-bold shadow-sm shadow-white/50 cursor-pointer" onClick={saveTodDatabase}>
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

