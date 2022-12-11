import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder } from "../../Features/orderSlice";
import Payment from "../Pay/Payment";

function OrderShow() {
  const dispatch = useDispatch();
  const [payMode, setPayMode] = useState(false);
  const order = useSelector((state) => state.order.order);
  // canel order, if want to change the order.
  const cancel = (e) => {
    e.preventDefault();
    dispatch(cancelOrder());
  };
  // Pay order is use when user completely agree with what they order, and check on price, then it will redirect to payment form.
  const pay = (e) => {
    e.preventDefault();
    if (order.total == 0) return alert("Empty cart");
    setPayMode(true);
  };
  return (
    <div className="flex flex-col h-full w-full bg-yellow-900/40 overflow-scroll">
      <span className="flex h-[70px] text-center items-center justify-center font-bold text-[24px] tracking-widert border-2 border-x-white">
        Detail
      </span>
      <div className="relative h-full w-full">
        {order.orderItems != 0 ? (
          order.orderItems.map((data, index) => (
            <div className="flex flex-row w-full p-2" key={index}>
              <div className="flex flex-row justify-between w-full p-2 text-[24px] font-bold">
                <div>
                  {data.quantity} x {data.namePrice} {data.name}
                </div>
                <div>${data.subTotal}</div>
              </div>
            </div>
          ))
        ) : (
          <>Empty</>
        )}
        <div className="absolute bottom-0 h-[300px] w-full border-t-2 border-white p-5 text-[20px] font-bold">
          <div className="flex flex-col h-full w-full space-y-10">
            <div className="flex flex-col space-y-5">
              <div className="flex flex-row justify-between w-full">
                <span>SUBTOTAL</span>
                <span>$ {order.subTotal}</span>
              </div>
              <div className="flex flex-row justify-between w-full">
                <span>Sale Tax</span>
                <span>% {order.saleTax}</span>
              </div>
              <div className="flex flex-row justify-between w-full">
                <span>Total</span>
                <span>$ {order.total}</span>
              </div>
            </div>
            {!payMode ? (
              <div className="flex flex-row w-full justify-evenly">
                <button
                  className="pt-2 pb-2 pl-10 pr-10 bg-red-500 rounded-full"
                  onClick={cancel}
                >
                  Cancel
                </button>
                <button
                  className="pt-2 pb-2 pl-10 pr-10 bg-green-500 rounded-full text-black"
                  onClick={pay}
                >
                  Pay
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {payMode ? <Payment setPayMode={setPayMode} /> : <></>}
    </div>
  );
}

export default OrderShow;
