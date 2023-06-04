const mongoose = require('mongoose');

const facultyschema = new mongoose.Schema({
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
    facdepart:{
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

const facultymodel = mongoose.model('Faculty',facultyschema);
module.exports = facultymodel;