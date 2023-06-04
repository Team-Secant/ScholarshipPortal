const mongoose = require('mongoose');

const dependantschema = new mongoose.Schema({
    stid:{
        type: String,
        required: true
    },
    depname:{
        type: String,
        required: true,
        default: "none"
    },
    deprel:{
        type: String,
        required: true,
        default: "none"
    },
    depoccup:{
        type: String,
        required: true,
        default: "none"

    },
    depincome:{
        type: String,
        required: true,
        default: "none"

    },
    totalearner:{
        type: String,
        required: true,
        default: "none"

    },
    famincome:{
        type: String,
        required: true,
        default: "none"

    },
    depcontact:{
        type: String,
        required: true,
        default: "none"

    },
    depresadd:{
        type: String,
        required: true,
        default: "none"

    },
    monetaryamount:{
        type: String,
        required: true,
        default: "none"
    },
    

})

const dependantmodel = mongoose.model('Dependant',dependantschema);
module.exports = dependantmodel;