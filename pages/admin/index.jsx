import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { apiUrl } from "../../config";

const Index = ({ orders, products }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["Preparing", "On the way", "Delivered"];

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(`${apiUrl}/product/` + id);
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put(`${apiUrl}/order/` + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex p-14">
      <div className="flex-1 mr-4">
        <h1 className="text-xl font-bold mb-4">Product Details</h1>
        <table className="w-full text-center">
          <thead>
            <tr className="bg-gray-200 ">
              <th></th>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className="divide-y-2">
                <td></td>
                <td className="pt-2">
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                    className="rounded-md"
                  />
                </td>
                <td className="text-sm font-medium">
                  {product._id.slice(0, 5)}...
                </td>
                <td className="text-sm font-medium">{product.title}</td>
                <td className="text-sm font-medium">${product.prices[0]}</td>
                <td>
                  <button
                    className="text-tertiary"
                    onClick={() => handleDelete(product._id)}
                  >
                    <MdDelete size={22} />
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className="flex-1 ml-4">
        <h1 className="text-xl font-bold mb-4">Orders</h1>
        <table className="w-full text-center ">
          <tbody>
            <tr className="bg-gray-200 ">
              <th></th>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className="divide-y-2">
                <td></td>
                <td className="pt-2 p-4 text-sm font-medium">
                  {order._id.slice(0, 5)}...
                </td>
                <td className="p-4 text-sm font-medium">{order.customer}</td>
                <td className="p-4 text-sm font-medium">${order.total}</td>
                <td className="p-4 text-sm font-medium">
                  {order.method === 0 ? <span>COD</span> : <span>Online</span>}
                </td>
                <td className="p-4 text-sm font-medium">
                  {status[order.status]}
                </td>
                <td className="p-4 text-sm font-medium">
                  <button
                    className="capitalize bg-gray-900 text-secondary p-2 opacity-90 rounded-md w-full"
                    onClick={() => handleStatus(order._id)}
                  >
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  const productRes = await axios.get(`${apiUrl}/product`);
  const orderRes = await axios.get(`${apiUrl}/order`);

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;
