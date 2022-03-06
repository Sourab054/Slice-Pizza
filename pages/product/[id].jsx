import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import cartSlice, { addProduct } from "../../redux/cartSlice";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { motion } from "framer-motion";
import { fadeInUp, stagger } from "../../components/animation/animations";
import { apiUrl } from "../../config";

const Product = ({ pizza }) => {
  //   const [price, setPrice] = useState(pizza.prices[0]);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);

  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, topping) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(topping.price);
      setExtras((prev) => [...prev, topping]);
    } else {
      changePrice(-topping.price);
      setExtras(extras.filter((extra) => extra._id !== topping._id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...pizza, extras, price, quantity, size }));
  };

  return (
    <motion.section
      initial="initial"
      animate="animate"
      exit={{ opacity: 0 }}
      className="bg-secondary py-6"
    >
      <div className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto min-h-[calc(100vh-80px)] pt-12 grid grid-rows-2 lg:grid-cols-2">
        <div className="mb-5 sm:mr-4 sm:p-0">
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: -200, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
            className="relative h-full w-full"
          >
            <Image
              src={pizza.img}
              layout="fill"
              objectFit="cover"
              alt=""
              className="rounded-xl"
            />
          </motion.div>
        </div>
        <motion.div variants={stagger} className="space-y-4">
          <motion.h1
            variants={fadeInUp}
            className="text-3xl font-pop line sm:text-4xl font-semibold capitalize pb-4"
          >
            {pizza.title}
          </motion.h1>
          <motion.span variants={fadeInUp} className="text-2xl font-bold ">
            ${price}
          </motion.span>
          <motion.p variants={fadeInUp} className="">
            {pizza.desc}
          </motion.p>
          <motion.h3 variants={fadeInUp} className="pb-2 font-medium">
            Choose the size :
          </motion.h3>
          <motion.div
            variants={fadeInUp}
            className="w-[75%] sm:w-[50%] lg:w-[70%] xl:w-[50%] flex justify-between"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-[40px] h-[40px] relative cursor-pointer"
              onClick={() => handleSize(0)}
            >
              <Image src="/img/size.png" layout="fill" alt="" />
              <span className="absolute -top-2.5 -right-10 bg-primary text-secondary rounded-xl px-2">
                Small
              </span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-[50px] h-[50px] relative cursor-pointer"
              onClick={() => handleSize(1)}
            >
              <Image src="/img/size.png" layout="fill" alt="" />
              <span className="absolute -top-2 -right-14 bg-primary text-secondary rounded-xl px-2">
                Medium
              </span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-[60px] h-[60px] relative cursor-pointer"
              onClick={() => handleSize(2)}
            >
              <Image src="/img/size.png" layout="fill" alt="" />
              <span className="absolute -top-2 -right-8 bg-primary text-secondary rounded-xl px-2">
                Large
              </span>
            </motion.div>
          </motion.div>
          <motion.h3 variants={fadeInUp} className="font-semibold text-lg pt-2">
            Choose additional ingredients
          </motion.h3>
          <motion.div variants={fadeInUp} className="flex mb-8 ">
            {pizza.extraToppings.map((topping, i) => (
              <div className="mr-3" key={i}>
                <input
                  type="checkbox"
                  id={topping.text}
                  name={topping.text}
                  className="w-4 h-4 mr-1 checked:bg-primary"
                  onChange={(e) => handleChange(e, topping)}
                />
                <label htmlFor={topping.text} className="text-sm">
                  {topping.text}
                </label>
              </div>
            ))}
          </motion.div>
          <div className="flex items-center pt-4 ">
            <div className="mr-8">
              <button
                className="p-4"
                onClick={() => setQuantity(quantity < 1 ? 1 : quantity--)}
              >
                <AiOutlineMinus />
              </button>
              <span className="px-2">{quantity}</span>
              <button
                className="p-4"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <AiOutlinePlus />
              </button>
            </div>
            <motion.button
              variants={fadeInUp}
              className="font-semibold capitalize bg-primary text-secondary px-4 py-2 rounded-lg"
              onClick={handleClick}
            >
              Add to Cart
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Product;

export async function getServerSideProps({ params, req }) {
  const res = await axios.get(`${apiUrl}/product/${params.id}`);
  // console.log(req);
  return {
    props: {
      pizza: res.data,
    },
  };
}
