const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
const db = require('./config/mongoDB')


//import
const foodRouter = require('./routers/food')
const blogRouter = require('./routers/blog')
const travelRouter = require('./routers/travel')
const authRouter = require('./routers/auth')
const sliderRouter = require('./routers/slider')
const searchRouter = require('./routers/search')


//port
const port = process.env.PORT || 4000

//app
app.use(cors())
app.use(morgan('combined'))

//middleware
//xử lý ko nhận đc req.body
app.use(express.json())
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


app.listen(port, () => {
    console.log('server is running on' + port)
})