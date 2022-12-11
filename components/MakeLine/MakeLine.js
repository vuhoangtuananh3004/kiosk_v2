import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import db from "../../firebaseConfig";

import Image from "next/image";
import ImgBackground from "../Img/ImgBackground";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import NavBarTop from "../NavBar/NavBarTop";
import { getPayment, orderReady } from "../../Features/makelineSlice";
function MakeLine() {
  const handle = useFullScreenHandle();
  const router = useRouter();
  const name = router.query.name;
  const dispatch = useDispatch();
  const order = useSelector((state) => state.sale.order);

  // get all order from payment collection, after items were paid by customer ==> use onSnapshot for real time update whenever new customer purchase an item
  useEffect(() => {
    if (name) {
      const q = query(collection(db, "payments"), where("name", "==", name));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        dispatch(getPayment({ bussiness: name }));
      });
    }
  }, [dispatch, name]);
  console.log(order);
  // Ready button, send message to the database that order have been done or make ==> no longer in makeline state, it will be store to history ordder
  const ready = (data) => {
    dispatch(orderReady({name:name, obj: data}))
  }
  // Just display when order fully loaded
  if (!order) return <h2>Loading......</h2>;

  return (
    <FullScreen handle={handle}>
      <div className="absolute h-screen w-screen overflow-auto">
        <ImgBackground />
        <div className="flex flex-row w-full h-[100px] justify-center items-center bg-green-500/70 cursor-pointer text-[36px] text-white font-bold tracking-widest" onClick={handle.enter}>MAKE LINE</div>
        <div className="grid grid-cols-4 h-full w-full gap-4 p-5">
          {order.map((data, index) => (
            <div className="relative h-[400px] w-[300px]" key={index}>
              <div className="flex flex-col h-full w-full bg-white/80 rounded-[24px] overflow-auto">
                <div className="flex flex-col w-full bg-blue-700 justify-center items-center text-white font-bold p-3 rounded-[24px] space-y-1">
                  <Image
                    className="rounded-full"
                    src={"https://thumbs.dreamstime.com/b/print-210960253.jpg"}
                    alt="image not found"
                    height={70}
                    width={70}
                  />
                  <span className="flex items-end text-sm"></span>
                  <div className="flex flex-row w-full justify-between">
                    <span>{data.order.orderNum}</span>
                    <span>{data.order.total}$</span>
                  </div>
                </div>
                <div className="flex flex-col p-2">
                  {data.order.orderItems.map((doc, index) => (
                    <span key={index}>
                      <span className="font-bold"> {doc.quantity} x</span>{" "}
                      {doc.namePrice} {doc.name}
                    </span>
                  ))}
                </div>
                <button className="absolute w-full bottom-0 pt-2 pb-2 border-t-2 border-black bg-green-500 rounded-br-[24px] rounded-bl-[24px] font-bold" onClick={() => ready(data)}>
                  READY
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FullScreen>
  );
}

export default MakeLine;
