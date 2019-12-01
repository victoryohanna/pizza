const mongoose = require('mongoose');

const userLoginSchema = mongoose.Schema({
    userId : String,
    email : String,
    password : String
})

module.exports =  mongoose.model('user', userLoginSchema);