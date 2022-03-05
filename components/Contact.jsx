import Image from "next/image";
import React from "react";
import { IoMdCall, IoMdMailOpen } from "react-icons/io";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { easing, fadeInUp, stagger } from "./animation/animations";

const Contact = () => {
  return (
    <section id="contact-us" className="bg-secondary py-6">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5, ease: easing }}
        exit={{ opacity: 0 }}
        className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto min-h-[100vh] flex flex-col lg:flex-row items-center justify-between"
      >
        <motion.div
          variants={fadeInUp}
          className="relative h-[325px] sm:h-[400px] lg:h-[500px] w-full mr-8 order-last lg:order-none"
        >
          <Image
            src="/img/restaurant.png"
            alt=""
            layout="fill"
            objectFit="contain"
          />
        </motion.div>

        <motion.div variants={stagger} className="w-full mr-5">
          <motion.h1
            variants={fadeInUp}
            className="text-5xl font-bold pb-10 line"
          >
            Contact Us
          </motion.h1>
          <motion.h1 variants={fadeInUp} className="text-2xl font-bold pb-8">
            Reserve a table at our wonderful restaurants right now.
          </motion.h1>
          <motion.p variants={fadeInUp} className="font-medium text-lg pb-4">
            We look forward to seeing you.
          </motion.p>
          <motion.p variants={fadeInUp} className="">
            <span className="flex items-center mb-4">
              <IoMdCall className="text-primary  mr-2" size={25} />
              281 516 7707{" "}
            </span>{" "}
            <span className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-primary mr-2" size={20} />
              240 3rd Street North Neptune Beach, FL 32266{" "}
            </span>
            <span className="flex items-center mb-4">
              <IoMdMailOpen className="text-primary mr-2" size={20} />
              info@slice.com
            </span>
            <span className="flex items-center mb-4">
              <MdOutlineAccessTimeFilled
                className="text-primary mr-2"
                size={20}
              />
              Monday - Sunday : 10 AM to 11 PM
            </span>
            <br /> <br />
            <span className="text-lg font-semibold flex ">
              <span className="mt-2 text-tertiary font-pop ml-1 tracking-wider">
                GIVE LIFE A SLICE
              </span>
            </span>
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;

//  <span className="flex items-center mb-4">
//             <IoMdCall className="text-primary  mr-2" size={25} />
//             281 516 7707
//           </span>
//           <span className="flex items-center mb-4">
//             <FaMapMarkerAlt className="text-primary mr-2" size={20} />
//             240 3rd Street North Neptune Beach, FL 32266
//           </span>
