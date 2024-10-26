// some packages which is required
import express from "express";
// import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

// importing routes
import clientRoutes from "./routes/clientRoutes.js";
import generalRoutes from "./routes/generalRoutes.js";
import managementsRoutes from "./routes/managementsRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";

// importing the data from the dummy database file
import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat,dataAffiliateStat } from "./dataBase/index.js";
// console.log(dataProductStat[0])
//importing the UserModel
import User from "./models/UserModel.js";
import Product from "./models/ProductModel.js"
import ProductStat from "./models/ProductStatModel.js";
import Transaction from "./models/TransactionModel.js"
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateState.js";


// Configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
// bodyParse method is now outdated so we do it like this
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementsRoutes);
app.use("/sales", salesRoutes);

// just for the confirmation
// app.get("/", function(req,res){
//     res.send("it's working")
// })

// mongoose setup
const PORT = process.env.PORT || 9000;
const MONGODB_URL = process.env.MongoDb_URl;

// console.log(ProductStat)

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    // only add the data one time
    // User.insertMany(dataUser)
    // Product.insertMany(dataProduct)
    // ProductStat.insertMany(dataProductStat)
    // Transaction.insertMany(dataTransaction)
    // OverallStat.insertMany(dataOverallStat)
    // AffiliateStat.insertMany(dataAffiliateStat)
  })
  .catch((error) => console.error(`Error connecting to MongoDB: ${error}`));
