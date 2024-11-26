/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import useCurrentUserInfo from "@/hoooks/useCurrentUserInfo";
import { useGetorderByUserQuery } from "@/redux/features/order/orderApi";
import { Key, ReactNode } from "react";

const OrderManagement = () => {
  const { email } = useCurrentUserInfo();
  const { data: orderData } = useGetorderByUserQuery(email);

  const orders = orderData?.data || [];

  console.log("orders", orderData);

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg p-4">
      <table className="min-w-full divide-y divide-gray-700 table-auto">
        <thead className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold tracking-wide uppercase">
              Payment Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold tracking-wide uppercase">
              Order Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold tracking-wide uppercase">
              Total Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold tracking-wide uppercase">
              Transaction ID
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700 text-gray-200">
          {orders?.map(
            (order: {
              _id: Key | null | undefined;
              paymentStatus: string | number | boolean | ReactNode;
              status: string | number | boolean | ReactNode;
              totalPrice: string | number | boolean | ReactNode;
              transactionId: string | null;
            }) => (
              <motion.tr
                key={order._id}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
                className="transition-transform duration-300 ease-in-out  hover:bg-gradient-to-r hover:from-gray-800 hover:via-gray-700 hover:to-gray-800"
              >
                <td className="px-6 py-4 whitespace-nowrap text-green-400 text-sm font-medium">
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
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400">
                  ${order.totalPrice}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {order.transactionId || (
                    <span className="text-gray-500">N/A</span>
                  )}
                </td>
              </motion.tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
