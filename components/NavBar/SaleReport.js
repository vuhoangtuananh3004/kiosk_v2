import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistory, getPayment } from "../../Features/saleReportSlice";
import db from "../../firebaseConfig";
function SaleReport() {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.sale.order);
  const user = useSelector((state) => state.account.user);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
// Load all the report from the ticket have been done when ever SaleReport is clicked, it is not real time update ==> need to click one more time for refresh
  useEffect(() => {
    if (loading) {
      dispatch(getHistory({ bussiness: user.nameBussiness }));
      setLoading(false);
    }
  }, [dispatch, loading, order, user]);

  console.log(order);
  return (
    <div>
      <table class="table-auto w-full">
        <thead className="h-[100px] bg-purple-900 text-[24px]">
          <tr className="text-white font-bold tracking-wider">
            <th className="w-10">Order Number</th>
            <th>Order Type</th>
            <th>Summary Order</th>
            <th>Order Date</th>
            <th>Total</th>
            <th>Tip</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody className="text-center font-bold divide-y divide-dashed text-[20px]">
          {order ? (
            order.map((doc, index) => (
              <tr className="odd:bg-green-200 h-10" key={index}>
                <td>{doc.order.orderNum}</td>
                <td>Togo</td>
                <td className="overflow-hidden break-normal w-[300px]">
                {doc.order.orderItems.map((data,index) => (<span className="text-sm" key={index}>{data.quantity}x{data.namePrice} {data.name}</span>))}
                </td>
                <td>{doc.order.paymentInfo.date}</td>
                <td>${doc.order.total}</td>
                <td>$0.00</td>
                <td>Visa **{doc.order.paymentInfo.card.substr(doc.order.paymentInfo.card.length - 2)}</td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SaleReport;
