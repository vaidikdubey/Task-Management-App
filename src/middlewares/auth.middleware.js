import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api-response.js";
import jwt from "jsonwebtoken";

export const isLoggedIn = async function (req, res, next) {
    //get access token & refresh token from req.cookie()
    //if no access token && refresh token -> return res
    //if found -> verify access token
    //if valid -> next
    //if invalid -> match refresh token
    //if valid -> generate and store new access and refresh tokens -> next()
    //attach req.user() before any next()
    //if invalid -> return unauthorised response

    const { accessToken, refreshToken } = req.cookies
    
    if (!accessToken && !refreshToken) {
        return res.status(401)
        .json(new ApiResponse(401, {message: "Unauthorised"}, "Unauthorised access"))
    }

    if (accessToken) {
        try {
            const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

            req.user = decodedToken

            return next()
        } catch (error) {
            //proceed to refresh token verification
        }
    }

    if (refreshToken) {
        try {
            const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

            //generate new tokens
            const user = await User.findById(decodedToken._id)

            if (!user) {
                return res.status(401)
                .json(new ApiResponse(401, {message: "Unauthorised"}, "Unauthorised access"))
            }

            const newAccessToken = user.generateAccessToken()
            const newRefreshToken = user.generateRefreshToken()

            user.refreshToken = newRefreshToken

            await user.save()

            const accessTokenCookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: 15 * 60 * 1000 //15min
            };

            res.cookie("accessToken", newAccessToken, accessTokenCookieOptions)

            const refreshTokenCookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 //7days
            };

            res.cookie("refreshToken", newRefreshToken, refreshTokenCookieOptions)

            req.user = {_id: user._id, email: user.email}

            return next()
        } catch (error) {
            return res.status(400)
                .json(new ApiResponse(400, {message: "Unauthorised"}, "Unauthorised access"))
        }
    }
}