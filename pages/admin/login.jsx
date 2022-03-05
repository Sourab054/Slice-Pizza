import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { notify } from "../../redux/cartSlice";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });
      router.push("/admin");
      notify("success", "Admin logged in successfully!");
    } catch (err) {
      setError(true);
      notify("error", "Something went wrong. Try again");
    }
  };

  return (
    <div className=" ">
      <form className="bg-secondary min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="border-2 border-gray-200 p-4 bg-white shadow-lg rounded-lg w-[75%] md:w-[40%] lg:w-[25%] mx-auto">
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-900 dark:focus:border-gray-900"
              placeholder=""
              required=""
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-900 dark:focus:border-gray-900"
              required=""
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="bg-gray-900 text-secondary hover:bg-gray-800 focus:ring-4 focus:ring-gray-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleClick}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
