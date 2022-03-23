const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api" // development api
    : "https://slice-pizza-4vxo4cr1d-sourab054.vercel.app/api"; // production api

export { apiUrl };
