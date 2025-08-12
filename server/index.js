import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import subscribeRoute from "./routes/subscribe.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/subscribe", subscribeRoute);

app.listen(process.env.PORT || 5000, () => console.log("API ready"));