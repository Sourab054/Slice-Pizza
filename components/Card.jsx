import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fadeInUp } from "./animation/animations";

const PizzaCard = ({ product }) => {
  const dispatch = useDispatch();
  // console.log(product);

  return (
    <Link href={`/product/${product._id}`} passHref>
      <motion.div
        variants={fadeInUp}
        className="max-w-sm m-2 relative w-full border border-gray-300 bg-[#F4F4F4] shadow-lg rounded-xl dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="relative h-60 xl:h-72 w-full" href="#">
          <Image
            className="p-8 rounded-t-xl"
            src={product.img}
            layout="fill"
            objectFit="cover"
            alt="product image"
          />
        </div>
        <div className="px-5 pb-5">
          <h3 className="text-xl py-2 capitalize font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.title}
          </h3>

          <p className="py-2 sm:text-sm xl:text-base">
            {product.desc.slice(0, 100)}...
          </p>

          <div className="flex justify-between items-center py-2">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ${product.prices[0]}
            </span>
            <button className="text-white uppercase bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:ring-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transform transition-all duration-150">
              More Info
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default PizzaCard;
