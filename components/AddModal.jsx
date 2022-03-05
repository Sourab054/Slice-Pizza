import { useState } from "react";
import axios from "axios";
import { notify } from "../redux/cartSlice";

const Add = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "imageUploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/duxpt2kbv/image/upload",
        data
      );
      const { url } = uploadRes.data;
      console.log(url);
      const newProduct = {
        title,
        desc,
        prices,
        extraToppings: extraOptions,
        img: url,
      };
      await axios.post("http://localhost:3000/api/product", newProduct);
      setClose(true);
      notify("success", "Item added");
    } catch (err) {
      console.log(err);
      notify("error", "Try again later.");
    }
  };

  return (
    <div className="overlay">
      <div className="bg-white w-[375px] sm:w-[500px] px-10 py-1.5 lg:py-3 flex flex-col items-center rounded-md justify-center relative">
        <span
          onClick={() => setClose(true)}
          className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center absolute -top-3 -right-3"
        >
          X
        </span>
        <h1 className="text-2xl font-semibold mb-4">Add Pizza</h1>
        <div className="w-full mb-4">
          <label
            className="block mb-2 font-semibold text-black dark:text-gray-300"
            htmlFor="user_avatar"
          >
            Upload an image
          </label>
          <input
            className="block w-full outline-none text-sm text-gray-900  rounded-lg border border-gray-900 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {/* <label className="mb-1 font-semibold">Choose an image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} /> */}
        </div>
        <div className="mb-4 w-full">
          <label className="mb-1 font-semibold">Title</label>
          <input
            className="border border-gray-900 focus:outline-none focus:border-gray-500 focus:ring-gray-500 block w-full rounded-md sm:text-sm focus:ring-1 border-b border-gray"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="w-full mb-4">
          <label className="mb-1 font-semibold">Desc</label>
          <textarea
            rows={4}
            type="text"
            className="border border-gray-900 focus:outline-none focus:border-gray-500 focus:ring-gray-500 block w-full rounded-md sm:text-sm focus:ring-1 border-b border-gray"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-1 font-semibold">Prices</label>
          <div className="flex justify-between">
            <input
              className="rounded-md border border-gray-900 w-[25%] focus:outline-none focus:border-gray-500 focus:ring-gray-500 block sm:text-sm focus:ring-1 border-b border-gray"
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className="rounded-md border border-gray-900 w-[25%] focus:outline-none focus:border-gray-500 focus:ring-gray-500 block sm:text-sm focus:ring-1 border-b border-gray"
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className="rounded-md border border-gray-900 w-[25%] focus:outline-none focus:border-gray-500 focus:ring-gray-500 block sm:text-sm focus:ring-1 border-b border-gray"
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-1 font-semibold">Extra</label>
          <div className="flex justify-between">
            <input
              className="rounded-md border border-gray-900 w-[25%] focus:outline-none focus:border-gray-500 focus:ring-gray-500 block sm:text-sm focus:ring-1 border-b border-gray"
              type="text"
              placeholder="Item"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              className="rounded-md border border-gray-900 w-[25%] focus:outline-none focus:border-gray-500 focus:ring-gray-500 block sm:text-sm focus:ring-1 border-b border-gray"
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
            <button
              className="rounded-md capitalize bg-gray-900 text-secondary px-4 py-2 cursor-pointer"
              onClick={handleExtra}
            >
              Add
            </button>
          </div>
          <div className="mt-4 flex flex-wrap">
            {extraOptions.map((option) => (
              <span
                key={option.text}
                className="px-2 py-1 text-tertiary border rounded-md border-tertiary cursor-pointer mr-3 mb-2"
              >
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button
          className="rounded-md capitalize border border-primary text-primary px-4 py-1.5 cursor-pointer self-end"
          onClick={handleCreate}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Add;
