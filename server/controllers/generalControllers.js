import User from "../models/UserModel.js";
import OverallStat from "../models/OverallStat.js";

import Transaction from "../models/TransactionModel.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("GetUserId", id);
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // console.log(user);

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // hardcode values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    // rescent Transaction
    const recentTransactions = await Transaction.find()
      .sort({ createdOn: -1 })
      .limit(35);

      // console.log(recentTransactions)

    // overall Stats
    const overallStats = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStats[0];

    // console.log(overallStats[0].monthlyData);
    const thisMonthStats = overallStats[0].monthlyData.find(({month})=>{
      return month === currentMonth
      // console.log("Month",month === currentMonth)
    });

    // console.log(thisMonthStats)

    const todayStats = overallStats[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });
    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      recentTransactions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching dashboard stats",
      error: error.message,
    });
  }
};
