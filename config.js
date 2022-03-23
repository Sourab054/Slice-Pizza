const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api" // development api
    : "https://slice-pizza-app-f50dtir3j-sourab054.vercel.app/api"; // production api

export { apiUrl };
