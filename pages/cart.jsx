// import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../redux/cartSlice";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import OrderModal from "../components/OrderModal";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import Link from "next/link";
import { apiUrl } from "../config";
import { BsArrowLeftShort, BsTrashFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { fadeInUp, stagger } from "../components/animation/animations";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };
  const dispatch = useDispatch();
  const router = useRouter();

  const cartTotal = () => {
    return cart.products.reduce((acc, curr) => {
      return (acc = acc + curr.price * curr.quantity);
    }, 0);
  };

  const totalAmt = cartTotal();

  const createOrder = async (data) => {
    try {
      const res = await axios.post(`${apiUrl}/order`, data);
      if (res.status === 201) {
        dispatch(reset());
        router.replace(`/order/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && (
          <svg
            role="status"
            className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-tertiary"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        )}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                console.log(orderId);
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <section className="bg-secondary py-6">
      <div className="max-w-[270px] xs:max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto flex items-center justify-between">
        <motion.button
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="lg:max-w-4xl xl:max-w-7xl text-xs sm:text-sm xl:text-base font-semibold flex items-center justify-center capitalize bg-gray-100 text-primary shadow-sm px-4 py-2 rounded-lg"
          onClick={() => router.back()}
        >
          <BsArrowLeftShort size={22} />
          Back
        </motion.button>
        <motion.button
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="lg:max-w-4xl xl:max-w-7xl text-xs sm:text-sm xl:text-base font-semibold flex items-center justify-center bg-primary text-white shadow-sm px-4 py-2 rounded-lg"
          onClick={() => dispatch(reset())}
        >
          Remove all
          <BsTrashFill size={16} className="text-tertiary ml-1" />
        </motion.button>
      </div>
      <div className="max-w-[270px] overflow-scroll sm:overflow-hidden xs:max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto min-h-[calc(100vh-80px)] pt-8 flex flex-col lg:flex-row items-start">
        {cart.products.length >= 1 ? (
          <>
            <div className="lg:grow mb-4 sm:mr-4">
              <table className="w-full table-auto border-separate [border-spacing:0.5rem] text-center">
                <thead className="">
                  <tr className="bg-gray-200 ">
                    <th className="hidden sm:block p-2">Product</th>
                    <th className="text-sm sm:text-base p-2">Name</th>
                    <th className="text-sm sm:text-base p-2">Toppings</th>
                    <th className="text-sm sm:text-base p-2">Price</th>
                    <th className="text-sm sm:text-base p-2">Quantity</th>
                    <th className="text-sm sm:text-base p-2">Total</th>
                  </tr>
                </thead>
                <tbody className="pt-2 ">
                  {cart.products.map((product, i) => (
                    <tr className="" key={i}>
                      <td className="hidden sm:block pt-4">
                        <div className="h-[80px] relative">
                          <Image
                            src={product.img}
                            layout="fill"
                            objectFit="contain"
                            alt=""
                            className="rounded-lg"
                          />
                        </div>
                      </td>
                      <td>
                        <span className="font-semibold text-xs text-primary sm:text-base lg:text-lg">
                          {product.title}
                        </span>
                      </td>
                      <td>
                        <span className="text-xs sm:text-base">
                          {product.extras.length === 0 ? (
                            <span>-</span>
                          ) : (
                            product.extras.map((extra, index) => (
                              <span key={extra._id}>
                                {" "}
                                {(index ? ", " : "") + extra.text}{" "}
                              </span>
                            ))
                          )}
                        </span>
                      </td>
                      <td>
                        <span className="text-xs sm:text-base ">
                          ${product.price.toFixed(2)}
                        </span>
                      </td>
                      <td>
                        <span className="text-xs sm:text-base ">
                          {product.quantity}
                        </span>
                      </td>
                      <td>
                        <span className="text-xs sm:text-base font-semibold">
                          ${(product.price * product.quantity).toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className={
                open
                  ? "bg-gray-200 p-4 justify-self-end lg:grow-0 h-[50%]"
                  : "bg-gray-200 p-4 justify-self-end lg:grow-0 h-[40%]"
              }
            >
              <div className="space-y-2">
                <h2 className="font-bold text-center mb-4">CART TOTAL</h2>
                <div className="text-sm sm:text-base">
                  Subtotal:
                  <span className="font-semibold">
                    {" "}
                    $ {totalAmt.toFixed(2)}
                  </span>
                </div>
                <div className="text-sm sm:text-base">
                  Discount:<span className="font-semibold">$0.00</span>
                </div>
                <div className="text-sm sm:text-base">
                  Total:
                  <span className="font-semibold"> ${totalAmt.toFixed(2)}</span>
                </div>
                {open ? (
                  <div className="">
                    <button
                      className="font-semibold capitalize bg-gray-900 text-secondary px-4 py-2 opacity-90 rounded-sm w-full my-3"
                      onClick={() => setCash(true)}
                    >
                      CASH ON DELIVERY
                    </button>
                    <PayPalScriptProvider
                      options={{
                        "client-id":
                          "AXVQWKr6PL4A1oHzJ77xwjF_fKXg6HMN4frtxSD78A7FDVGlmyyZm5YHX17izlybxZrxC3oYGuhRAqAD",
                        components: "buttons",
                        currency: "USD",
                        "disable-funding": "credit,card,p24",
                      }}
                    >
                      <ButtonWrapper currency={currency} showSpinner={false} />
                    </PayPalScriptProvider>
                  </div>
                ) : (
                  <button
                    onClick={() => setOpen(true)}
                    className="font-semibold capitalize bg-primary text-secondary px-4 py-2 opacity-90 rounded-sm w-full my-3"
                  >
                    CHECKOUT NOW
                  </button>
                )}
              </div>
            </div>
            {cash && (
              <OrderModal
                setCash={setCash}
                total={totalAmt}
                createOrder={createOrder}
              />
            )}
          </>
        ) : (
          <div className="flex-1 px-4 py-2 font-body mb-12 lg:px-36">
            <div className="flex flex-col items-center justify-center">
              <div className="relative h-80 w-full">
                <Image
                  src="/img/EmptyCart.svg"
                  layout="fill"
                  objectFit="contain"
                  alt="Empty Cart"
                />
              </div>
              <h3 className="text-2xl font-semibold my-4 ">
                Your Cart is Empty!
              </h3>
              <p className="text-lg text-center font-medium mb-4">
                Please add items to continue shopping.
              </p>
              <Link href="/menu" passHref>
                <button className="bg-secondary mb-2 text-sm font-semibold text-primary tracking-widest px-4 py-2 rounded-md shadow-sm transition-all duration-300 border border-tertiary hover:bg-primary hover:text-secondary hover:border-primary ipad:mb-4">
                  Explore
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
