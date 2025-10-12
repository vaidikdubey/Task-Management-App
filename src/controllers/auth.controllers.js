import { asyncHandler } from "../utils/async-handler.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import crypto from "crypto";
import { sendEmail, emailVerificationMailgenContent, verifiedEmailMailgenContent, resendEmailVerificationMailgenContent, forgotPasswordMailgenContent } from "../utils/mail.js"
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  //algorithm
  //get data from req.body -> data is already verified in middleware
  //check if user already exists -> yes, return response
  //if not -> create user in db
  //add all fields to user
  //create email verification token and timeout
  //add verification token in db
  //save user
  //send verification email to user
  
  const { email, username, password, fullname } = req.body;
  
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists")
  }

  try {
    const user = await User.create({
      email,
      username,
      password,
      fullname
    })
  
    const temporaryTokens = user.generateTemporaryToken();
  
    user.emailVerificationToken = temporaryTokens.hashedToken;
    user.emailVerificationExpiry = temporaryTokens.tokenExpiry;
  
    await user.save()
  
    const emailOptions = {
      email: user.email,
      subject: "Verify your email",
      mailgenContent: emailVerificationMailgenContent(user.username, `${process.env.BASE_URL}/api/v1/auth/verify/${temporaryTokens.unHashedToken}`)
    }
  
    await sendEmail(emailOptions)
  
    res.status(201).json(new ApiResponse(201, {
      email: user.email,
      username: user.username,
      fullname: user.fullname
    }, "User created successfully"))
  } catch (error) {
    throw new ApiError(500, "User registration failed")
  }
});

const loginUser = asyncHandler(async (req, res) => {
  //get data from req.body -> data already validated
  //find user based on email -> if no -> return res
  //if found -> match password -> if no -> return res
  //if matched -> generate access and refresh tokens
  //store refresh token in db
  //save user
  //store tokens in cookies
  //return response
  
  const { email, username, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(401, "Invalid credentials")
    }

    const isPasswordMatched = await user.isPasswordCorrect(password)

    if (!isPasswordMatched) {
      throw new ApiError(401, "Invalid credentials")
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

    res.status(200)
      .json(new ApiResponse(200, {
        email: user.email,
        accessToken: newAccessToken
      }, "User login successful"))
  } catch (error) {
    throw new ApiError(500, "User login failed")
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: new Date(0)
    }

    res.clearCookie("accessToken", cookieOptions)
    res.clearCookie("refreshToken", cookieOptions)

    res.status(200)
    .json(new ApiResponse(200, {message: "Tokens cleared"}, "User logout successful"))
    
  } catch (error) {
    throw new ApiError(500, "Error logging out")
  }
});

const verifyEmail = asyncHandler(async (req, res) => {
  //get token from req.params
  //verify if token is received
  //hash token to make it same as db
  //find user based on token
  //mark isVerified as true
  //make verification token and verification token expiry as undefined
  //save user
  //send verified email
  //send response
  
  const { token } = req.params;

  if (!token) {
    throw new ApiError(404, "Token not found")
  }
  
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
  console.log(hashedToken)

  try {
    const user = await User.findOne(
      {
        emailVerificationToken: hashedToken,
        emailVerificationExpiry: { $gt: Date.now() }
      })
    
    if (!user) {
      throw new ApiError(400, "Invalid token")
    }

    user.isEmailVerified = true

    user.emailVerificationToken = undefined
    user.emailVerificationExpiry = undefined

    await user.save()

    const emailOptions = {
      email: user.email,
      subject: "Welcome to Task Management App!",
      mailgenContent: verifiedEmailMailgenContent(user.username)
    }
  
    await sendEmail(emailOptions)

    res.status(200).json(new ApiResponse(200, {
      username: user.username,
      email: user.email
    }, "Email verified successfully"))

  } catch (error) {
    throw new ApiError(500, "Email verification failed")
  }
});

const resendEmailVerification = asyncHandler(async (req, res) => {
  //get user from req.user.id
  //check if user is found
  //create new verification token -> save in db
  //save user
  //send mail
  //send response

  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      throw new ApiError(404, "User not found")
    }

    const temporaryTokens = user.generateTemporaryToken();
  
    user.emailVerificationToken = temporaryTokens.hashedToken;
    user.emailVerificationExpiry = temporaryTokens.tokenExpiry;
  
    await user.save()
  
    const emailOptions = {
      email: user.email,
      subject: "Verify your email",
      mailgenContent: resendEmailVerificationMailgenContent(user.username, `${process.env.BASE_URL}/api/v1/auth/verify/${temporaryTokens.unHashedToken}`)
    }
  
    await sendEmail(emailOptions)

    res.status(200)
      .json(new ApiResponse(200, { message: "Email verification mail sent successfully" }));
    
  } catch (error) {
    throw new ApiError(500, "Resend email verification failed")
  }
});

const resetForgottenPassword = asyncHandler(async (req, res) => {
  //get token from params
  //get password from body
  //find user based on token
  //update password for user
  //update resetpassword token and expiry to undefined
  //save user
  //send response

  const { token } = req.params
  const { password } = req.body
  
  if (!token) {
    throw new ApiError(404, "Token not found")
  }

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex")

    const user = await User.findOne({
      forgotPasswordToken: hashedToken,
      forgotPasswordExpiry: {$gt: Date.now()}
    })

    if(!user) {
      throw new ApiError(404, "User not found")
    }

    user.password = password;

    user.forgotPasswordToken = undefined
    user.forgotPasswordExpiry = undefined

    await user.save()

    res.status(200)
      .json(new ApiResponse(200, {
        email: user.email,
        username: user.username
      }, "Password reset successful"));
    
  } catch (error) {
    throw new ApiError(500, "Password reset failed")
  }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  //get refresh token from cookies
  //if no refresh token -> unauthorised
  //match refresh token with db token -> no match -> unauthorised
  //decode token -> find user based on token
  //create new access and refresh token
  //store refresh token in db
  //save db
  //set new tokens in cookies
  //send response

  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new ApiError(401, "Invalid token")
  }

  try {
    const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findById(decodedToken._id)

    if (!user) {
      throw new Error(401, "Invalid token, no user found")
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

    res.status(200)
      .json(new ApiResponse(200, {
        accessToken: newAccessToken
      }, "Access token refreshed successfully"));
    
  } catch (error) {
    throw new ApiError(500, "Access token refresh failed")
  }
});

const forgotPasswordRequest = asyncHandler(async (req, res) => {
  //get data from req.body -> already validated
  //find user based on email
  //generate token
  //save token in db
  //send token to user via email
  //send response

  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if(!user) {
      throw new ApiError(400, "Invalid email address")
    }

    const tokens = user.generateTemporaryToken()

    user.forgotPasswordToken = tokens.hashedToken;
    user.forgotPasswordExpiry = tokens.tokenExpiry;

    await user.save()

    const mailOptions = {
      email: user.email,
      subject: "Reset your password",
      mailgenContent: forgotPasswordMailgenContent(user.username, `${process.env.BASE_URL}/api/v1/auth/reset-password/${tokens.unHashedToken}`)
    }

    await sendEmail(mailOptions)

    res.status(200)
      .json(new ApiResponse(200, {
        token: tokens.unHashedToken
      }, "Forgot password successful"))
    
  } catch (error) {
    throw new ApiError(500, "Forgot password failed")
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  //get user from req.user._id
  //verify if old password matches with db password
  //update user password with new password
  //generate new access and refresh token and save for user
  //save user
  //send refresh token in cookies
  //send response

  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      throw new ApiError(404, "User not found")
    }

    const { oldPassword, password } = req.body;

    const isPasswordMatched = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordMatched) {
      throw new ApiError(400, "Old password is incorrect")
    }

    user.password = password;

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

    res.status(200)
      .json(new ApiResponse(200, {
        username: user.username,
        email: user.email,
        accessToken: newAccessToken
      }, "Password changed successfully"));
    
  } catch (error) {
    throw new ApiError(500, "Password change failed")
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password -forgotPasswordToken -forgotPasswordExpiry -refreshToken -emailVerificationToken -emailVerificationExpiry");

    if (!user) {
      throw new ApiError(404, "User not found")
    }

    res.status(200)
      .json(new ApiResponse(200, {
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        avatar: user.avatar,
        emailVerified: user.isEmailVerified
      }, "User profile found"));
    
  } catch (error) {
    throw new ApiError(500, "User profile not found")
  }
});

export {
  changeCurrentPassword,
  forgotPasswordRequest,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
  resetForgottenPassword,
  verifyEmail,
};
