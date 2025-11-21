"use client";

export default function OrderItem({ order }: any) {
  return (
    <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between">
        <div>
          <p className="font-medium text-gray-900">{order.productName}</p>
          <p className="text-gray-500 text-sm">Order ID: {order.id}</p>
        </div>

        <span className="text-sm text-green-600 font-medium">
          {order.status}
        </span>
      </div>
    </div>
  );
}
