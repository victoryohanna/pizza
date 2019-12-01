
// //get dependencies
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 8080;   

//const url = 'mongodb://localhost:27017/meandb';
const url = 'mongodb+srv://victoryohanna:tanams5562@cluster0-pizvr.mongodb.net/test?retryWrites=true&w=majority'
const app = express();


//ESTABLISH CONNECTION TO THE DATABASE
    mongoose.connect(url, { useNewUrlParser: true}).then(()=>{
            console.log("SUCCESSFULY CONNECTED TO THE DATABASE");
        }).catch(err=>{
            console.log("FAIL TO CONNECT TO THE DATABASE");
            process.exit();
     });
/*-------------------------------------------------------------*/

// perse request 
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//enable cors for all http header  
app.use(cors());
app.use('/uploads', express.static('uploads'));

const api = require('./controllers/api')
app.use('/api', api); 

app.use(express.static(path.join(__dirname, 'public'))); 
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
})
app.listen(port, ()=>console.log("Server start at port " + port));
