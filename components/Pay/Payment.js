import React, { useEffect, useState } from "react";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelOrder,
  getPayment,
  makePayment,
} from "../../Features/orderSlice";
import { doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import db from "../../firebaseConfig";
import PaymentSuccessfull from "./PaymentSuccessfull";
function Payment({ setPayMode }) {
  // So far we have only one payment method is by VISA
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const user = useSelector((state) => state.account.user);
  const order = useSelector((state) => state.order.order);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    name: "",
    card: "",
    expiry: "",
    cvc: "",
    paymentType: "VISA",
  });
  let date = new Date().toLocaleDateString();
  // Listen realtime update when some customer make an payment ==> can increase the ticket number.
  const unsub = onSnapshot(doc(db, "payments", user.nameBussiness), (doc) => {
    setLoading(true);
  });
 // Listen realtime update when some customer make an payment ==> can increase the ticket number.
  useEffect(() => {
    if (isLoading) {
      dispatch(getPayment({ bussiness: user.nameBussiness, order: order }));
      setLoading(false);
    }
  }, [dispatch, isLoading, order, paymentInfo, user.nameBussiness]);

  // Pay is used for validate if all information is enough and in form such as, name on card should letter, and card number should be a number
  // After that make payment and show order detail.
  const pay = (e) => {
    e.preventDefault();
    let errors = 0;
    Object.keys(paymentInfo).map((key, index) => {
      let number = paymentInfo[key].split("");
      if (paymentInfo[key] == "" && key != "expiry") errors = errors + 1;
      if (key == "name") {
        number.map((data) => {
          if (!isNaN(data) && data != " ") errors = errors + 1;
        });
      }
      if (key == "card") {
        number.map((data) => {
          if (isNaN(data)) errors = errors + 1;
        });
      }
      if (key == "cvc") {
        number.map((data) => {
          if (isNaN(data)) errors = errors + 1;
        });
      }
    });
    if (errors != 0) return alert("Invalid Card Info");
    else {
      console.log(order.orderNum);
      dispatch(
        makePayment({
          bussiness: user.nameBussiness,
          order: { ...order, paymentInfo: { ...paymentInfo, date: date } },
        })
      );
      setPaymentStatus(true);
    }
  };

  return (
    <div className="absolute top-0 left-0 h-screen w-3/4 bg-white/70">
      {!paymentStatus ? (
        <div className="relative h-full w-full">
          <span
            className="absolute right-10 text-[48px] cursor-pointer"
            onClick={() => setPayMode(false)}
          >
            <CancelTwoToneIcon color="secondary" fontSize="inherit" />
          </span>
          <div className="flex flex-col h-full w-full justify-center items-center text-black text-[20px] tracking-wider space-y-20">
            <span className="text-[48px] font-bold tracking-widest">
              QUIZ EAT PAYMENT
            </span>
            <div className="flex flex-col h-[400px] w-[600px] space-y-5">
              <div className="flex flex-col w-full">
                <span>Name on card</span>
                <input
                  className="ml-5 w-[550px] border border-black rounded-[12px] p-2"
                  placeholder="Ex: Quizeat"
                  onChange={(e) =>
                    setPaymentInfo({ ...paymentInfo, name: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col w-full">
                <span>Card number</span>
                <input
                  className="ml-5 w-[550px] border border-black rounded-[12px] p-2"
                  placeholder="1234 5678 9012 3456"
                  type="number"
                  onChange={(e) =>
                    setPaymentInfo({ ...paymentInfo, card: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-row w-full justify-between">
                <div className="flex flex-col w-full">
                  <span>Expiry date</span>
                  <input
                    className="ml-5 w-[250px] border border-black rounded-[12px] p-2 text-center"
                    type="month"
                    placeholder={`${new Date().getMonth()} / ${new Date().getFullYear()}`}
                    onChange={(e) =>
                      setPaymentInfo({ ...paymentInfo, expiry: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col w-full">
                  <span>CVC</span>
                  <input
                    className="ml-5 w-[250px] border border-black rounded-[12px] p-2 text-center"
                    type="number"
                    placeholder="999"
                    onChange={(e) =>
                      setPaymentInfo({ ...paymentInfo, cvc: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex w-full justify-center z-50">
                <button
                  className="flex justify-center items-center w-[200px] p-4 border border-black rounded-[24px] bg-green-500/60 font-bold tracking-widest"
                  onClick={pay}
                >
                  PAY
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PaymentSuccessfull setPayMode={setPayMode} paymentInfo={paymentInfo} order={order}/>
      )}
    </div>
  );
}

export default Payment;
