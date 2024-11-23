import express from "express";
import connectDB from "./config/DB.js";
import dotenv from "dotenv";
import router from "./routes.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

const port = process.env.PORT || 8000;
const DATABASE_URL = process.env.MONGO_URL;

// database connection
connectDB(DATABASE_URL);

// all middleware load
app.use(express.json());
app.use(cookieParser());

// load all routes

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
