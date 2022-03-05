import axios from "axios";
import React from "react";
import Card from "../../components/Card";

const index = ({ productList, admin }) => {
  return (
    <section className="bg-secondary min-h-[calc(100vh-80px)] flex items-center justify-center mb-8">
      <div className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto flex flex-col items-center justify-between">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary py-10">
          Our Pizza&#39;s
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-y-5 sm:gap-x-4 lg:grid-cols-3 gap-10">
          {productList.map((product) => (
            <Card product={product} key={product._id} />
          ))}
        </div>
      </div>
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
  const res = await axios.get("http://localhost:3000/api/product");
  // console.log(res);
  return {
    props: {
      productList: res.data,
      admin,
    },
  };
}
