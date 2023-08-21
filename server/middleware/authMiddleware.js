const jwt = require('jsonwebtoken')


const authMiddleware = {
    verify: (req, res, next) => {
        const token = req.headers.token
        if(token){
            const accessToken = token.split(" ")[1]
            if(!accessToken){
                return res.status(403).json('token ko ton tai')
            }else{
                jwt.verify( accessToken, process.env.VERIFY_KEY_TOKEN, (err, user) =>  {
                    req.user = user
                    next()
                } )
            }
        }else{
            res.status(401).json('ban chua dang nhap')
        }
    },

    verifyAdmin: (req, res, next) => {
        authMiddleware.verify(req, res, () => {

        })
    }
}


module.exports = authMiddleware