/* eslint-disable @typescript-eslint/no-explicit-any */
import useCurrentUserInfo from "@/hoooks/useCurrentUserInfo";
import { useGetorderByUserQuery } from "@/redux/features/order/orderApi";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

const OrderManagement = () => {
  const { email } = useCurrentUserInfo();
  const { data: orderData } = useGetorderByUserQuery(email);

  const orders = orderData?.data || [];

  console.log("orders", orderData);

  return (
    <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-md p-4">
      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead className="bg-gradient-to-r from-green-500 to-green-700 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold">
              Payment Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold">
              Order Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold">
              Total Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold">
              Transaction ID
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-600 divide-y divide-gray-200 text-white">
          {orders?.map(
            (order: {
              _id: Key | null | undefined;
              paymentStatus:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | null
                | undefined;
              status:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | null
                | undefined;
              totalPrice:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | null
                | undefined;
              transactionId: any;
            }) => (
              <tr
                key={order._id}
                className="transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-700"
              >
                <td className="px-6 py-4 whitespace-nowrap text-green-400">
                  {order.paymentStatus}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span
                    className={`${
                      order.status === "unconfirmed"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  ${order.totalPrice}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {order.transactionId || "N/A"}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
