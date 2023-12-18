const { authModel, refreshTokenModel, userModel } = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authController = {

    generateAccessToken: (user) => {
        const accessToken = jwt.sign(
            {
                user
            },
            process.env.ACCESS_KEY_JWT,
            { expiresIn: '15s' }
        )

        return accessToken
    },

    generateRefreshToken: (user) => {
        const refrehToken = jwt.sign(
            {
                user
            },
            process.env.REFRESH_KEY_TOKEN
        )

        return refrehToken
    },

    //get all auth
    getAllAuth: async (req, res) => {
        try {
            const auths = await authModel.find();
            res.status(200).json(auths)
        } catch (error) {
            res.status(500).json(error)
        }

    },

    //register
    register: async (req, res, next) => {
        const saltRound = 10

        try {
            const salt = await bcrypt.genSalt(saltRound)
            const hash = await bcrypt.hash(req.body.password.trim(), salt)
            const auth = await authModel.findOne({ userName: req.body.userName })

            if (auth) return res.status(403).json("Tên đăng nhập đã tồn tại")


            const newAuth = await new authModel({
                userName: req.body.userName.trim(),
                email: req.body.email.trim(),
                password: hash
            })

            const savedAuth = await newAuth.save()

            const newuser = await new userModel({
                name: req.body.userName.trim(),
                avatar: "",
                coverImg: "",
                userID: savedAuth._id
            })
            const saveUser = await newuser.save()
            res.status(200).json({
                auth: savedAuth,
                user: saveUser
            })
        } catch (error) {
            res.status(500).json(next)
        }
    },

    //login
    logIn: async (req, res, next) => {
        try {
            const user = await authModel.findOne({ userName: req.body.userName })

            if (!user) return res.status(404).json("Tên đăng nhập không tồn tại")

            const validatePassword = await bcrypt.compare(
                req.body.password,
                user.password
            )

            if (!validatePassword) return res.status(404).json("Mật khẩu không chính xác")

            if (user && validatePassword) {
                const accessToken = authController.generateAccessToken(user)
                const refreshToken = authController.generateRefreshToken(user)

                // res.cookie('token', accessToken, { httpOnly: true })

                const newRefreshToken = new refreshTokenModel({ refreshToken })
                const saveRefreshToken = await newRefreshToken.save()
                //loai bo password de bao mat
                const { password, ...other } = user._doc
                const userinfo = await userModel.findOne({ userID: user._id })
                return res.status(200).json({ ...other, accessToken, userinfo, photo: userinfo.avatar.data, refreshToken: saveRefreshToken.refreshToken })
            }
        } catch (error) {
            res.status(500).json(next)
        }
    },

    requestRefreshToken: async (req, res) => {
        console.log(req.headers.token)
        const refreshToken = await refreshTokenModel.findOne({ refreshToken: req.headers.token })
        if (!refreshToken) return res.status(401).json('ko co refresh token')

        jwt.verify(refreshToken.refreshToken, process.env.REFRESH_KEY_TOKEN, (err, user) => {
            if (err) {
                err = {
                    name: "JsonWebTokenError",
                    message: "jwt malformed",
                    level: "error"
                }
                return res.status(403).json('ban ko co quyen')
            }

            const newAccessToken = authController.generateAccessToken(user)
            return res.status(200).json({ accessToken: newAccessToken })
        })

    },

    //logOut
    logOut: async (req, res) => {
        await refreshTokenModel.deleteOne({ refreshToken: req.body.token })
        res.status(200).json("tc")
    }
}

module.exports = authController