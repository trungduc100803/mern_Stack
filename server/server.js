const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
const db = require('./config/mongoDB')
const { createServer } = require('http')
const { Server } = require('socket.io')
const app = express()
const cookieParser = require('cookie-parser')
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000'
    }
})


//import
const foodRouter = require('./routers/food')
const blogRouter = require('./routers/blog')
const travelRouter = require('./routers/travel')
const authRouter = require('./routers/auth')
const sliderRouter = require('./routers/slider')
const searchRouter = require('./routers/search')
const userRouter = require('./routers/user')
const commentRoter = require('./routers/comment')
const { env } = require('process')

//port
const port = process.env.PORT || 4000

//app
app.use(cors())
app.use(morgan('combined'))
app.use(cookieParser())

//middleware
//xử lý ko nhận đc req.body
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded())


//db
db.connect()

//router
app.use('/api/auth', authRouter)
app.use('/api/food', foodRouter)
app.use('/api/blog', blogRouter)
app.use('/api/travel', travelRouter)
app.use('/api/slider', sliderRouter)
app.use('/api/search', searchRouter)
app.use('/api/user', userRouter)
app.use('/api/comment', commentRoter)


io.on('connection', (socket) => {

    socket.on('setup', user => {
        socket.join(user._id)
    })

    socket.on('join_comment', (blogID) => {
        socket.join(blogID)
    })

    socket.on('new_comment', (newMessageRecieved) => {
        io.sockets.emit('recieved_comment', newMessageRecieved)
    })

});



httpServer.listen(port, () => {
    console.log('server is running on' + port)
})
