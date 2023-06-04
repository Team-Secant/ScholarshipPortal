const mongoose = require('mongoose');

const othermemberschema = new mongoose.Schema({
    usertype:{
        type: String,
        required: true
    },
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true,
    },
    incomeimg:{
        type: String,
        required: true,
    },
    incomeimgpid:{
        type: String,
        required: true,
    },
    soi:{
        type: String,
        required: true
    },
    occupation:{
        type: String,
        required: true
    },
    monthlyinc:{
        type: String,
        required: true
    },
    nationality:{
        type: String,
        required: true
    },
    cnic:{
        type: String,
        required: true,
        unique: true
    },
    contact:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    postalcode:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

const othermembermodel = mongoose.model('Othermember',othermemberschema);
module.exports = othermembermodel;