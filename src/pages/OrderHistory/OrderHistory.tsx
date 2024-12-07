import useCurrentUserInfo from "@/hoooks/useCurrentUserInfo";
import { useGetorderByUserQuery } from "@/redux/features/order/orderApi";
import { Key, ReactNode } from "react";

const OrderManagement = () => {
  const { email } = useCurrentUserInfo();
  const { data: orderData } = useGetorderByUserQuery(email);

  const orders = orderData?.data || [];

  console.log("orders", orderData);

  return (
    <div className="overflow-x-auto p-4 bg-white dark:bg-gray-900">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto">
        <thead className="bg-gray-200 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold tracking-wide uppercase text-gray-700 dark:text-gray-300">
              Payment Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold tracking-wide uppercase text-gray-700 dark:text-gray-300">
              Order Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold tracking-wide uppercase text-gray-700 dark:text-gray-300">
              Total Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold tracking-wide uppercase text-gray-700 dark:text-gray-300">
              Transaction ID
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-50 dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 text-gray-900 dark:text-gray-200">
          {orders?.map(
            (order: {
              _id: Key | null | undefined;
              paymentStatus: string | number | boolean | ReactNode;
              status: string | number | boolean | ReactNode;
              totalPrice: string | number | boolean | ReactNode;
              transactionId: string | null;
            }) => (
              <tr
                key={order._id}
                className="transition-transform duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4 whitespace-nowrap text-green-600 dark:text-green-400 text-sm font-medium">
                  {order.paymentStatus}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span
                    className={`${
                      order.status === "unconfirmed"
                        ? "text-yellow-500 dark:text-yellow-400"
                        : "text-green-500 dark:text-green-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400">
                  ${order.totalPrice}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {order.transactionId || (
                    <span className="text-gray-500 dark:text-gray-400">
                      N/A
                    </span>
                  )}
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
