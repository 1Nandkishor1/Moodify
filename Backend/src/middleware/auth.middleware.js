const blacklistModel = require("../model/blacklist.model");
const userModel = require("../model/user.model");
let redis=require('../config/blacklist')
const jwt = require("jsonwebtoken");


async function authUser(req, res, next) {
    let token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Token not provided"
        })
    }

    let isTokenBlacklisted=await redis.get(token)

    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,
        )

        req.user = decoded

        next()
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = {authUser}