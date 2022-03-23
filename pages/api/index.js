export default async (req, res) => {
  const { method } = req;

  // This will allow OPTIONS request
  if (method === "OPTIONS") {
    console.log("CORS Fixed");
    return res.status(200).send("ok");
  }
};
