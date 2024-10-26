import mongoose from "mongoose";
import User from "../models/UserModel.js";
import Transaction from "../models/TransactionModel.js";
import AffiliateStat from "../models/AffiliateState.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    const userWithStats = await User.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      {
        $unwind: {
          path: "$affiliateStats",
        },
      },
    ]);

    // console.log("userWithStats",userWithStats);
    // Check if user and affiliateStats exist
    if (!userWithStats.length || !userWithStats[0].affiliateStats) {
      return res
        .status(404)
        .json({ message: "User or affiliate stats not found" });
    }

    
    const saleTransaction = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        // console.log(id);
        return Transaction.findById(id);
      })
    );
    console.log(saleTransaction);
    const filteredSaleTransaction = saleTransaction.filter(
      (transaction) => transaction !== null
    );
    res
      .status(200)
      .json({ user: userWithStats[0], sales: filteredSaleTransaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

// export const getUserPerformance = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const affiliateStats = await AffiliateStat.aggregate([
//       { $match: { userId: new mongoose.Types.ObjectId(id) } },
//     ]);
//     console.log(affiliateStats);

//     if (!affiliateStats) {
//       return res.status(404).json({ message: "Affiliate stats not found" });
//     }

//     res.status(200).json({ affiliateStats });

//     console.log(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//     console.log(error);
//   }
// };
