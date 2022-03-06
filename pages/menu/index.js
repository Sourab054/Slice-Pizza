import axios from "axios";
import React from "react";
import Card from "../../components/Card";
import { motion } from "framer-motion";
import {
  easing,
  fadeInUp,
  stagger,
} from "../../components/animation/animations";
import { apiUrl } from "../../config";

const index = ({ productList, admin }) => {
  return (
    <section className="bg-secondary min-h-[calc(100vh-80px)] flex items-center justify-center mb-8">
      <motion.div
        initial="initial"
        animate="animate"
        exit={{ opacity: 0 }}
        className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto flex flex-col items-center justify-between"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-4xl sm:text-5xl font-bold text-primary py-10"
        >
          Our Pizza&#39;s
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-y-5 sm:gap-x-4 lg:grid-cols-3 gap-10">
          {productList.map((product) => (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 1, delay: 0.5, ease: easing }}
              exit={{ opacity: 0 }}
              key={product._id}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                exit={{ opacity: 0 }}
              >
                <Card product={product} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default index;

export async function getServerSideProps(ctx) {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  const res = await axios.get(`${apiUrl}/product`);
  // console.log(res);
  return {
    props: {
      productList: res.data,
      admin,
    },
  };
}
