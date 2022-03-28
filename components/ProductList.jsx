import Card from "./Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { motion } from "framer-motion";
import { easing, fadeInUp, stagger } from "./animation/animations";
// import {} from './animation/animations';

const ProductList = ({ productList }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <section className="bg-secondary py-6 min-h-[100vh] sm:flex sm:items-center sm:justify-center">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5, ease: easing }}
        className="max-w-[300px] xs:max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-2xl xs:text-3xl text-center font-bold py-8 line-center"
        >
          Popular Recipes
        </motion.h1>
        <motion.div className="lg:p-6">
          <Carousel
            swipeable={true}
            draggable={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={false}
            keyBoardControl={true}
            customTransition="all 1s"
            transitionDuration={500}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            className="z-40 bg-secondary"
          >
            {productList.map((product) => (
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                key={product._id}
                exit={{ opacity: 0 }}
              >
                <Card product={product} />
              </motion.div>
            ))}
          </Carousel>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProductList;
