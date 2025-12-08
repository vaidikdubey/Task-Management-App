import mongoose from "mongoose";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

const healthCheck = asyncHandler(async (req, res) => {
    const dbState = mongoose.connection.readyState

    const dbStatesArray = ["Disconnected", "Connected", "Connecting", "Disconnecting"];

    return res.status(200)
        .json(new ApiResponse(200, {
            status: 200,
            uptime: process.uptime().toFixed(0) + "s",
            database: dbStatesArray[dbState],
            timestamp: new Date().toISOString()
    }, "Server is healthy🚀"))
})

export { healthCheck };