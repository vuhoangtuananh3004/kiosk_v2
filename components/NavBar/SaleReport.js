import React from "react";

function SaleReport() {
  return (
    <div>
      <table class="table-auto w-full">
        <thead className="h-[100px] bg-purple-900 text-[24px]">
          <tr className="text-white font-bold tracking-wider">
            <th className="w-10">Order Number</th>
            <th>Order Type</th>
            <th>Summary Order</th>
            <th>Order Time</th>
            <th>Total</th>
            <th>Tip</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody className="text-center font-bold divide-y divide-dashed text-[20px]">
          <tr className="odd:bg-green-200 h-10">
            <td>1</td>
            <td>Togo</td>
            <td>1 x Pizza Combo</td>
            <td>5:00 PM</td>
            <td>$23.99</td>
            <td>$2.00</td>
            <td>Visa **13</td>
          </tr>
          
        </tbody>
      </table>
    </div>
  );
}

export default SaleReport;
