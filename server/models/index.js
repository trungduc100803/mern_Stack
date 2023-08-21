const mongoose = require('mongoose')


//slider model
const slider = new mongoose.Schema({
    silderURL: { type: String, require: true }
}, { timestamps: true })



//travel model
const travel = new mongoose.Schema({
    URLimg: [String],
    name: { type: String, require: true },
    description: { type: String, require: true },
    address: { type: String, require: true },
    city: { type: String, require: true },
    activity: { type: String, require: true },
    like: { type: Number },
    slug: { type: String, require: true },
    liked: { type: Boolean, default: false },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    schedule: {
        startDate: { type: String, require: true },
        startTime: { type: String, require: true },
        forcusHours: { type: String, require: true },
        time: { type: String, require: true },
        startAddress: { type: String, require: true },
        leftAttend: { type: Number, require: true },
    },
    addressTourism: { type: String, require: true },
    vehicle: { type: String, require: true },
    foods: { type: String, require: true },
    typeHotel: { type: String, require: true },
    goodTime: { type: String, require: true },
    applicateObject: { type: String, require: true },
    endow: { type: String, require: true },
    infoDetail: { type: String, require: true },
    personAttend: {
        adult: { type: Number, default: 0 },
        kid: { type: Number, default: 0 },
        smallKid: { type: Number, default: 0 },
        baby: { type: Number, default: 0 },
    }
}, { timestamps: true })



//food model
const food = new mongoose.Schema({
    URLimg: [String],
    name: { type: String, require: true },
    description: { type: String, require: true },
    address: { type: String, require: true },
    city: { type: String, require: true },
    price: { type: String, require: true },
    menuFood: [

    ],
    timeServe: { type: String, require: true },
    like: { type: Number },
    slug: { type: String, require: true },
    liked: { type: Boolean, default: false },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })


// blog model
const blog = new mongoose.Schema({
    URLimg: [String],
    title: { type: String, require: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    content: { type: String, require: true },
    slug: { type: String, require: true },
    liked: { type: Boolean, default: false }
}, { timestamps: true })


const auth = new mongoose.Schema({
    userName: { type: String, require: true, unique: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    admin: { type: Boolean, default: false }
}, { timestamps: true })


const user = new mongoose.Schema({
    name: { type: String, require: true },
    avatar: { type: String, require: true },
    coverImg: { type: String, require: true },
    blog: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'blog'
        }
    ],
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: 'auth'
    }
}, { timestamps: true })

const refreshToken = new mongoose.Schema({
    refreshToken: { type: String, require: true }
}, { timestamps: true })


let userModel = mongoose.model('user', user)
let authModel = mongoose.model('auth', auth)
let sliderModel = mongoose.model('slider', slider)
let travelModel = mongoose.model('travel', travel)
let foodModel = mongoose.model('food', food)
let blogModel = mongoose.model('blog', blog)
let refreshTokenModel = mongoose.model('refreshToken', refreshToken)


module.exports = {
    travelModel, sliderModel,
    foodModel, blogModel,
    authModel, userModel,
    refreshTokenModel
}