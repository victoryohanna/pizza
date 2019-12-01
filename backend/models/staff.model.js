const mongoose = require('mongoose');

const staffSchema = mongoose.Schema({
    //idNumber : String,
    firstName : {
        type : String, required : true },  
    lastName: {
        type : String },
    gender: {
        type : String},
    mydate: {
        type : String}, 
    email: {
        type : String, required : true },
    phoneNumber: {
        type : String, required : true },
    address: {
        type : String },
    department: {
        type : String },
    password: {
        type : String, minLength : (8, 'Minimumof 8 characters require'), require : true},
    companyName: {
        type : String}
});

module.exports = mongoose.model('staff', staffSchema);