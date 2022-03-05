import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { easing, fadeInUp, stagger } from "./animation/animations";

const About = () => {
  return (
    <section
      id="about"
      className="bg-secondary min-h-[100vh] py-6 flex flex-col lg:flex-row items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5, ease: easing }}
        exit={{ opacity: 0 }}
        className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between"
      >
        <motion.div variants={stagger} className="w-full mr-5">
          <motion.h1
            variants={fadeInUp}
            className="text-5xl font-bold py-10 line"
          >
            About Us
          </motion.h1>
          <motion.p variants={fadeInUp} className="">
            Pizza Pilgrims serves slow proved Neapolitan pizza in both our own
            pizzerias and at events across the uk. All of our dough is made
            fresh daily and we source the best ingredients Italy has to offer in
            order to bring you the best possible pizza base going. As any
            Neapolitan will tell you – its all about the crust.Pizza Pilgrims
            serves slow proved Neapolitan pizza in both our own pizzerias and at
            events across the uk. All of our dough is made fresh daily and we
            source the best ingredients Italy has to offer in order to bring you
            the best possible pizza base going. As any Neapolitan will tell you
            – its all about the crust. <br /> <br />
            <motion.span
              variants={fadeInUp}
              className="text-lg font-semibold flex "
            >
              <span className="mt-2 text-tertiary font-pop ml-1 tracking-wider">
                IN CRUST WE TRUST.
              </span>
            </motion.span>
          </motion.p>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          className="relative h-[325px] w-full sm:h-[400px] lg:h-[500px] lg:w-[80%]"
        >
          <Image
            src="/img/about.png"
            alt=""
            layout="fill"
            objectFit="contain"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
