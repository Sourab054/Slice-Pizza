import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { motion } from "framer-motion";
import { easing, fadeInUp, stagger } from "./animation/animations";

const Banner = () => {
  return (
    <section className="bg-primary py-6">
      <motion.div
        initial="initial"
        animate="animate"
        exit={{ opacity: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 place-content-center max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto min-h-[calc(100vh-80px)] text-gray-100 "
      >
        <motion.div
          variants={stagger}
          className="pt-12 lg:pt-20 xl:pt-36 xl:pl-8"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-5xl font-bold mb-6 line"
          >
            Welcome
          </motion.h2>
          <motion.h4 variants={fadeInUp} className="text-lg mb-6 ">
            We bring together everyone with a slice of pizza. The world&#39;s
            best stovetop pizza maker. Get a perfect pizzeria style pizza every
            time in just 30 mins. <br /> Your time is valuable, so is pizza, get
            the most out of both. Discover what&#39;s new and order online.{" "}
          </motion.h4>
          <Link href="/menu" passHref>
            <motion.button
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-6 py-3 mt-12 font-semibold capitalize border-2 border-tertiary flex items-center rounded-lg"
            >
              Order Now
              <span
                className="group-hover:translate-x-1 transition-all ease-in-out duration-200 "
                style={{ marginLeft: "8px", marginTop: "2px" }}
              >
                <AiOutlineArrowRight />
              </span>
            </motion.button>
          </Link>
        </motion.div>
        <div className="row-start-1 my-12 row-end-3 sm:ml-12 md:mx-auto lg:row-span-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: easing }}
            className="relative w-[350px] h-[300px] sm:w-[400px] sm:h-[400px] xl:w-[650px] xl:h-[500px] transform animateBanner"
          >
            <Image
              src="/img/banner.png"
              alt=""
              layout="fill"
              objectFit="contain"
              className="drop-shadow-2xl"
            />
            <div className="absolute shadow-2xl bg-secondary border border-tertiary -z-10 w-[310px] h-[310px] sm:w-[410px] sm:h-[410px] xl:w-[490px] xl:h-[490px] rounded-full -left-5 right-0 bottom-[1px] xl:bottom-[10px] mx-auto">
              <div className="absolute shadow-2xl bg-secondary border border-tertiary -z-10 w-[20px] h-[20px] xl:w-[50px] xl:h-[50px] rounded-full -right-0 -top-15"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Banner;
