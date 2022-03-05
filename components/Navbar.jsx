import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  const router = useRouter();
  return (
    <div className="h-[80px] flex items-center justify-between sticky z-50 top-0 text-white bg-primary px-12">
      <div className="flex-1 items-center justify-center">
        <Link href={`/`} passHref>
          {/* <h2 className="text-3xl tracking-wider cursor-pointer ">LOGO</h2> */}
          <div className="relative h-20">
            <Image
              src="/img/logo1.png"
              layout="fill"
              alt="LOGO"
              objectFit="contain"
            />
          </div>
        </Link>
      </div>
      <div className="hidden sm:flex-auto sm:flex sm:items-center sm:justify-center">
        <ul className="flex items-center list-none ">
          <li
            className={
              router.asPath == "/"
                ? "m-4 cursor-pointer font-semibold border-b-2 border-secondary"
                : "m-4 cursor-pointer font-semibold opacity-75"
            }
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={
              router.asPath == "/menu"
                ? "m-4 cursor-pointer font-semibold border-b-2 border-secondary"
                : "m-4 cursor-pointer font-semibold opacity-75"
            }
          >
            <Link href="/menu">Menu</Link>
          </li>
          <li
            className={
              router.asPath == "/#about"
                ? "m-4 cursor-pointer font-semibold border-b-2 border-secondary"
                : "m-4 cursor-pointer font-semibold opacity-75"
            }
          >
            <Link href="/#about">About</Link>
          </li>
          <li
            className={
              router.asPath == "/#contact-us"
                ? "m-4 cursor-pointer font-semibold border-b-2 border-secondary"
                : "m-4 cursor-pointer font-semibold opacity-75"
            }
          >
            <Link href="#contact-us">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="flex-1 flex items-center justify-end">
        <Link href={`/cart`} passHref>
          <div className="relative cursor-pointer">
            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
            <div className="absolute -top-2 -right-3 w-[20px] h-[20px] font-bold p-2 bg-white text-primary flex items-center justify-center rounded-full">
              {+quantity}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
