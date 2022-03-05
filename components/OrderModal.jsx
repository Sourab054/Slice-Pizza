import { useState } from "react";
import { notify } from "../redux/cartSlice";

const OrderModal = ({ total, setCash, createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  const handleClick = () => {
    createOrder({ customer, address, total, method: 0 });
    notify("success", "Order placed successfully.");
  };

  return (
    <div className="overlay left-0">
      <div className="bg-white w-[400px] sm:w-[500px] px-10 py-3 flex flex-col items-center rounded-md justify-center relative">
        <span
          onClick={() => setCash(false)}
          className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center absolute -top-3 -right-3"
        >
          X
        </span>
        <h1 className="text-lg font-semibold mb-4">
          You will pay ${total} after delivery.
        </h1>
        <div className="flex flex-col w-full mb-4">
          <label className="mb-1 font-medium">Name</label>
          <input
            placeholder="John Doe"
            type="text"
            className="border border-gray-900 focus:outline-none focus:border-gray-500 focus:ring-gray-500 block w-full rounded-md sm:text-sm focus:ring-1 border-b border-gray"
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full mb-4">
          <label className="mb-1 font-medium">Phone Number</label>
          <input
            type="text"
            placeholder="+1 234 567 89"
            className="border border-gray-900 focus:outline-none focus:border-gray-500 focus:ring-gray-500 block w-full rounded-md sm:text-sm focus:ring-1 border-b border-gray"
          />
        </div>
        <div className="flex flex-col w-full mb-4">
          <label className="mb-1 font-medium">Address</label>
          <textarea
            rows={5}
            placeholder="Elton St. 505 NY"
            type="text"
            className="border border-gray-900 focus:outline-none focus:border-gray-500 focus:ring-gray-500 block w-full rounded-md sm:text-sm focus:ring-1 border-b border-gray"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button
          className="rounded-md capitalize bg-gray-900 text-secondary px-4 py-2 cursor-pointer "
          onClick={handleClick}
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default OrderModal;
