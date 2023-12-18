const jwt = require('jsonwebtoken')
const { authModel } = require('../models/index')

const authMiddleware = {
    verify: (req, res, next) => {
        const token = req.headers.token
        if (token) {
            const accessToken = token.split(" ")[1]
            if (!accessToken) {
                return res.status(403).json('token ko ton tai')
            } else {
                jwt.verify(accessToken, process.env.VERIFY_KEY_TOKEN, (err, user) => {
                    req.user = user
                    next()
                })
            }
        } else {
            res.status(401).json('ban chua dang nhap')
        }
    },

    isAdmin: async (req, res, next) => {
        try {
            const { id } = req.body
            const auth = await authModel.findOne({ _id: id })

            if (!auth) {
                return res.status(401).send({
                    success: false,
                    message: "no find auth"
                })
            }

            if (auth.role === 1) {
                next()
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                error,
                message: "error in isadmin"
            })
        }
    }
}


module.exports = authMiddleware