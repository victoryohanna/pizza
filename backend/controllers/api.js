const express = require('express'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const multer = require('multer');
const router = express.Router();
const secretKey = 'xc2fk_y5e7/fkg_6qdzw'
  
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) { 
      cb(null, Date.now() + file.originalname);
    }
  });
const fileFilter = (req, file, cb)=>{
    if(file.MimeType === 'image/jpeg' || file.MimeType === 'image/jpg'){
        cb(null, true);
    }else{
        cb(null, false); 
    }
}
  const upload = multer({ storage: storage, 
    limits: {
        fileSize : 1024 * 1024 * 5
  },
    //fileFilter : fileFilter
});

//var searchItem = '';

//Require Models
const Company = require('../models/company.model');
const Customer = require('../models/customer.model');
const Staff = require('../models/staff.model');
const Transaction = require('../models/transaction.model');
const Product = require('../models/product.model');
const User = require('../models/users.model');

  
//Register new company
router.post('/company', (req, res)=>{  
    let requestBody = req.body;  
    Company.findOne({email : requestBody.email } , (err, data)=>{
        if(err){
            console.log(err); 
        }else{
            if(data){ 
                res.status(401).send("Email Already Exist");
            }else{    
                    //Create company 
                let company = new Company(requestBody);
                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(company.password, salt, (err, hash)=>{
                        if(err) throw err;
                        //company.password = hash;
                        //company.saltSecret = salt;
                        company.save(res, (err,data)=>{
                            if(err){
                                    console.log(err);
                                }else{   
                                //Create payload which is a object that will contain the registered user id
                                let payload = { subject : data}
                                let token = jwt.sign(payload, secretKey)
                                res.status(200).send({token}); 
                            }
                        });
                    });
                });

            }    
        }
    });
});

//Register new customer
router.post('/customer', (req, res)=>{
    let requestBody = req.body;
    Customer.findOne({email : requestBody.email } , (err, data)=>{
        if(err){
            console.log(err); 
        }else{ 
            if(data){    
                res.status(401).send("User Already Exist");
            }else{
                //Create customer 
                let customer = new Customer(requestBody);
                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(customer.password, salt, (err, hash)=>{
                        if(err) throw err;
                       // customer.password = hash;
                        customer.save(res, (err,data)=>{
                            if(err){  
                                    console.log(err)  
                                }else{
                                //Create payload which is a object that will contain the registered user id
                                let payload = { subject : data}
                                let token = jwt.sign(payload, secretKey)
                                res.status(200).send({token}); ; 
                            }
                        });
                    });
                });
            }
        }
    });
});
//Add new product
router.post('/product', upload.single('productImage'), (req,res)=>{

    let pizza = new Product({   
        productId : req.body.productId,    
        productTitle : req.body.productTitle,
        size : req.body.size,
        description : req.body.description,
        price : req.body.price,
        companyName : req.body.companyName,
        productImage : req.file.path
    })
    pizza.save((err, data)=>{   
        if(!err){
            res.status(200).send(data);
        }else{   
            console.log("Product details not saved : " + JSON.stringify(err,undefined, 2))
        }
    });
});

//Order product
router.post('/transactions', (req, res)=>{
    let transaction = new Transaction({
        productId : req.body.productId,
        productTitle : req.body.productTitle,
        size : req.body.size,
        price : req.body.price,
        description : req.body.description,
        trnstatus : req.body.trnstatus,
        trndate : req.body.trndate,
        quantity : req.body.quantity,
        customerName : req.body.customerName,
        address : req.body.address,
        phoneNumber : req.body.phoneNumber,
        companyName : req.body.companyName

    })
    transaction.save((err, data)=>{
        if(!err){
            res.status(200).send(data);
        }else{
            res.status(401).send('Error occured');
        }
    })
})
// Login company admin
router.post('/company/login', (req, res)=>{
    let companyData = req.body;
    // Check if email exist in database
    Company.findOne({email:companyData.email, password: companyData.password}, (err, data)=>{
        if(err){
            console.log(err);  
        }else{
            if(!data){
                res.status(401).send('Invalid email or password');
            }else{
                let payload = { subject : data}
                let token = jwt.sign(payload, secretKey)
                res.status(200).send({token});   
            }
        }  
    });
});

// Login Customer 
router.post('/login', (req, res)=>{
    let customerData = req.body;
    // Check if email exist in database
    Customer.findOne({email:customerData.email, password: customerData.password}, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            if(!data){  
                res.status(401).send('Invalid email or password');
            }else{
                let payload = { subject : data};
                let token = jwt.sign(payload, secretKey);
                res.status(200).send({token});  
            }
        }
    });
});

//Register New Staff
router.post('/staff', (req, res)=>{
    let requestBody = req.body;
    Staff.findOne({email : requestBody.email } , (err, data)=>{
        if(err){ 
            console.log(err);  
        }else{ 
            if(data){   
                res.status(401).send("Staff Details Already Exist ");
            }else{
                //Create customer 
                let staff = new Staff(requestBody);
                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(staff.password, salt, (err, hash)=>{
                        if(err) throw err;
                       // staff.password = hash;
                        staff.save(res, (err,data)=>{
                            if(err){
                                    console.log(err);
                                }else{
                                    let payload = {subject: data};
                                    let token = jwt.sign(payload, secretKey);
                                    res.status(200).send({token}); 
                            }
                        });
                    });    
                });
            }
        }
    });
});

//Retrieve all products from db
router.get('/list', (req, res)=>{
    Product.find((err, data)=>{
        if(!err){
            res.send(data);
        }else{
            console.log("Record not found: " + JSON.stringify(err, undefined, 2));
        }
    });
});

//Retrieve all transaction records
router.get('/transactions', verifyToken, (req, res)=>{
    //let requestBody = req.body;
    Transaction.find((err, data)=>{
        if(!err){
            res.send(data);  
        }else{
            console.log("Record not found: " + JSON.stringify(err, undefined, 2));
        }
    });
});
 
//Retrieve all Staff records
router.get('/staffs', (req, res)=>{
    Staff.find((err, data)=>{
        if(!err){
            res.send(data);
        }else{
            console.log("Record not found: " + JSON.stringify(err, undefined, 2));
        }
    });
});

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request');
     }else{
         let token = req.headers.authorization.split(' ')[1]
         if(token === 'null'){
            return res.status(401).send('Unauthorized request');
         }else{
             let payload = jwt.verify(token, secretKey);
             if(!payload){
                 return res.status(401).send('Unauthorized request');
             }else{
                 req = payload.subject;
                 next();
             }
         }   
     }
}
module.exports = router;