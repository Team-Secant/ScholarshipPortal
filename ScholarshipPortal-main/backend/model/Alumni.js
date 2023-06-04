const mongoose = require('mongoose');

const alumnischema = new mongoose.Schema({
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
    yog:{
        type: String,
        required: true
    },
    degree:{
        type: String,
        required: true
    },
    job:{
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

const alumnimodel = mongoose.model('Alumni',alumnischema);
module.exports = alumnimodel;