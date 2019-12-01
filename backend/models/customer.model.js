const mongoose = require('mongoose'); 
  
const customerSchema = mongoose.Schema({
    
    firstName : String,
    lastName : String,  
    email : String,
    phoneNumber : String,
    password : String
});

module.exports = mongoose.model('customer', customerSchema);