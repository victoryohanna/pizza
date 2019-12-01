const mongoose =require('mongoose');

const transactionSchema = mongoose.Schema({
    productId : String,
    productTitle : String,
    size : String,
    price : String,
    description : String,
    trnstatus : String,
    trndate : String,
    customerName : String,
    address : String,
    quantity : Number,
    phoneNumber : String,
    companyName : String
});  

module.exports = mongoose.model('transaction', transactionSchema);