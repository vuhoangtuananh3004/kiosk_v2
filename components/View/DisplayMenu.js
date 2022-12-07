/* eslint-disable */
import Image from "next/image";
import React, { useState } from "react";
import OrderModal from "../OrderShow/OrderModal";

function DisplayMenu({ doc }) {
  const [modal, setModal] = useState(false);
  return (
    <>
      {modal ? <OrderModal setModal={setModal} doc={doc}/> : <></>}
      <div
        className="flex flex-col justify-center items-center w-[200px] h-[200px] rounded-[24px] border-2 border-white bg-white/20 text-[48px] hover:bg-slate-900/50 cursor-pointer"
        onClick={() => setModal(!modal)}
      >
        <div className="relative h-[150px] w-full bg-white rounded-tr-[24px] rounded-tl-[24px]">
          <Image
            src={doc.imgUrl}
            alt="Picture of the author"
            className="rounded-tr-[24px] rounded-tl-[24px]"
            unoptimized={true}
            layout="fill"
            objectFit="cover"
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
