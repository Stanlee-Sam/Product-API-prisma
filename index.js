import "dotenv/config";
import express from "express";
import productsRouter from "./routes/products.routes.js";
const app = express();
app.use(express.json());
app.use("/products", productsRouter);
app.listen(6000, () => {
  console.log("Server is running on port 6000");
});
