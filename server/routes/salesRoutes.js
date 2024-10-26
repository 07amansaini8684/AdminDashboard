import express from "express";
import {getOverallStats } from "../controllers/salesControllers.js"
const router = express.Router()

router.get("/sales", getOverallStats)

export default router