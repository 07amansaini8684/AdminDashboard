import Product from "../models/ProductModel.js";
import ProductStat from "../models/ProductStatModel.js";
import Transaction from "../models/TransactionModel.js";
import User from "../models/UserModel.js";
import getCountryIso3 from "country-iso-2-to-3"

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.findOne({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransaction = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
    console.log(
      "Page:",
      page,
      "PageSize:",
      pageSize,
      "Sort:",
      sort,
      "Search:",
      search
    );

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      console.log("sortParsed", sortParsed);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };
      console.log(sortFormatted);
      return sortFormatted;
    };

    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { userId: { $regex: search, $options: "i" } },
      ],
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeoGraphy = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "Somthing went wrong , Cannot grab the users " });
    }
    const mappedLocations = users.reduce((acc, { country}) => {
      const countryISO3 = getCountryIso3(country)
      if(!acc[countryISO3]){
        acc[countryISO3] = 0
      }
      acc[countryISO3] += 1
      return acc
    },{})

    const fromattedLocationns = Object.entries(mappedLocations).map(([country, count])=>{
      return {
        id: country, value: count
      }
    })
  
    res.status(200).json(fromattedLocationns)
  } catch {
    res.status(404).json({ message: "User not found" });
  }
};
