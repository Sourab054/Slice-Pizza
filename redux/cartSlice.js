import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
toast.configure();

export const notify = (type, message) => {
  if (type === "success") {
    toast.success(message, toastOptions);
  } else if (type === "info") {
    toast.info(message, toastOptions);
  } else {
    toast.error(message, toastOptions);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      let objToArr = [action.payload];
      let result = state.products.filter((o1) => {
        console.log(o1);
        objToArr.some((o2) => o1.extras?._id === o2.extras?._id);
      });
      const itemExists = state.products
        .map(
          (product) =>
            product._id === action.payload._id &&
            product.price === action.payload.price &&
            result
        )
        .values()
        .next().value;
      if (!itemExists) {
        state.products.push(action.payload);
        state.quantity += 1;
        state.total += action.payload.price * action.payload.quantity;
        notify("success", "Added to Cart");
      } else {
        const cartProd = state.products.find(
          (product) => product._id === action.payload._id
        );
        cartProd.quantity += action.payload.quantity;
        notify("success", "Added to Cart");
      }
    },

    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
