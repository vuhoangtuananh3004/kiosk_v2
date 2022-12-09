import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import db from "../../firebaseConfig";
import { getPayment } from "../../Features/saleReportSlice";
import OutdoorGrillTwoToneIcon from "@mui/icons-material/OutdoorGrillTwoTone";

function MakeLine() {
  const router = useRouter();
  const name = router.query.name;
  const dispatch = useDispatch();
  const order = useSelector((state) => state.sale.order);

  useEffect(() => {
    if (name) {
      const q = query(collection(db, "payments"), where("name", "==", name));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        dispatch(getPayment({ bussiness: name }));
      });
    }
  }, [dispatch, name]);
  console.log(order);
  if (!order) return <h2>Loading......</h2>;

  return (
    <div className="absolute h-screen w-screen bg-black p-5 overflow-auto">
      <div className="grid grid-cols-4 h-full w-full gap-4">
        {order.map((data, index) => (
          <div
            className="flex flex-col h-[400px] w-[300px] bg-white/80 rounded-[12px]"
            key={index}
          >
            <div className="flex flex-col h-[120px] w-full bg-blue-700/60 justify-center items-center text-white font-bold p-2">
              <span className="text-[36px]">
                <OutdoorGrillTwoToneIcon fontSize="inherit" />
              </span>
              <span className="flex h-[20px] items-end text-sm">
                Ready in 25 minutes
              </span>
              <div className="flex flex-row w-full justify-between items-end h-[40px]">
                <span>{data.order.orderNum}</span>
                <span>{data.order.total}$</span>
              </div>
            </div>
            <div className="flex flex-col p-2">
              {data.order.orderItems.map((doc, index) => (
                <span key={index}><span className="font-bold"> {doc.quantity} x</span> {doc.namePrice} {doc.name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MakeLine;
