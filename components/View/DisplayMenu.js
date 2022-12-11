/* eslint-disable */
import Image from "next/image";
import React, { useState } from "react";
import OrderModal from "../OrderShow/OrderModal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector } from "react-redux";
import { deleteItem } from "../../firebaseFunction";
function DisplayMenu({ doc }) {
  //  When an item is created it will display in menu
  const [modal, setModal] = useState(false);
  const user = useSelector(state => state.account.user)
  const station = useSelector((state) => state.station.station);
  // Remove an item if user want to make change
  const removeItem = (e) => {
    e.preventDefault();
    let name = user.nameBussiness + doc.name
    deleteItem(name)
  }
  return (
    <>
      {modal ? <OrderModal setModal={setModal} doc={doc} /> : <></>}
      <div
        className="flex flex-col justify-center items-center w-[200px] h-[200px] rounded-[24px] border-2 border-white bg-white/20 text-[48px] hover:bg-slate-900/50 cursor-pointer"
      >
        <div className="relative h-[150px] w-full bg-white rounded-tr-[24px] rounded-tl-[24px]">
          {station == "MANAGER" ? (
            <div className="absolute -top-9 -right-5 text-red-400 text-[36px]" onClick={removeItem}>
              <DeleteForeverIcon fontSize="inherit" />
            </div>
          ) : (
            <></>
          )}
          <Image
            src={doc.imgUrl}
            alt="Picture of the author"
            className="rounded-tr-[24px] rounded-tl-[24px]"
            unoptimized={true}
            layout="fill"
            objectFit="cover"
            onClick={() => setModal(!modal)}
          />
        </div>
        <span className="h-[50px] text-[15px] text-center font-bold tracking-wider">
          {doc.name}
        </span>
      </div>
    </>
  );
}

export default DisplayMenu;
