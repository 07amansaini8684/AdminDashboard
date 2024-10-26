
import OverallStat from "../models/OverallStat.js";

export const getOverallStats = async (req, res) => {
    try {
        const overallStats = await OverallStat.find();
        res.status(200).json(overallStats[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
