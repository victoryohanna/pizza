const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
    

const companySchema = mongoose.Schema({
     //_id : String,
     companyName :{
          type : String,
          required : 'Company Name can\'t be empty'
     } ,
     rcNumber :  {
          type: String,
          required : true
     },
     email : {
          type : String,
          required : 'Email can\'t be empty',
          //unique : true
     },
     phoneNumber : {
          type : String
     },
     password : {
          type : String,
          required : true,
          minLength : (8, 'Password should be minimum of 8 characters')
     },
     address : {
          type : String
     },
     saltSecret : String
});
     // Custom validation for email
     companySchema.path('email').validate((val) => {
          emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return emailRegex.test(val);
     }, 'Invalid e-mail.');
module.exports = mongoose.model('pizzahome', companySchema);

