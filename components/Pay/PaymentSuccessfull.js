import React from "react";
import { useDispatch } from "react-redux";
import { cancelOrder } from "../../Features/orderSlice";

function PaymentSuccessfull({setPayMode,paymentInfo,order}) {
    const dispatch = useDispatch()
    const close = (e) => {
        e.preventDefault();
        dispatch(cancelOrder())
        setPayMode(false)
    }
  return (
    <div className="flex flex-col h-full w-full justify-center items-center text-black z-40">
      <div className="flex flex-col h-[300px] w-[600px] justify-center font-bold space-y-5">
        <span className="text-[36px] tracking-widest">PAYMENT SUCCESSFULL</span>
        <span>Customer name: {paymentInfo.name}</span>
        <span>Order number: {order.orderNum}</span>
        <span>ETA: ready in 25 minutes</span>
      </div>
      <button
        className="text-[24px] pl-5 pr-5 border border-black rounded-[24px] bg-green-500"
        onClick={close}
      >
        DONE
      </button>
    </div>
  );
}
export default PaymentSuccessfull;
