const mongoose = require('mongoose');

const pizzaSchema = mongoose.Schema({
    productId : {
        type : String },
    productTitle : {
        type : String, required: true },
    size : {
        type: String },  
    description : {
        type : String },
    price : {
        type : String, required : true }, 
    companyName : { 
        type : String, required : true },
    productImage : {
        type : String } 
});

module.exports = mongoose.model('product', pizzaSchema);