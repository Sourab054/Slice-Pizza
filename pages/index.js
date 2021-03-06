import Head from "next/head";
import Image from "next/image";
import ProductList from "../components/ProductList";
import axios from "axios";
import Banner from "../components/Banner";
import About from "../components/About";
import Contact from "../components/Contact";
import AddModal from "../components/AddModal";
import AddButton from "../components/AddButton";
import { useState } from "react";
import { apiUrl } from "../config";

export default function Home({ productList, admin }) {
  const [close, setClose] = useState(true);
  return (
    <div className="">
      <Head>
        <title>Slice | Give Life a Slice</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      {/* <Slider /> */}
      {admin && <AddButton setClose={setClose} />}
      <ProductList productList={productList} />
      {!close && <AddModal setClose={setClose} />}
      <About />
      <Contact />
    </div>
  );
}

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
