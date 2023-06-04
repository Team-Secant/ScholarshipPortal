const mongoose = require('mongoose');

const appliedscScehma = new mongoose.Schema({
    stid: {
        type: String,
        required: true,
    },

    scid: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    },
    date:{
        type: Date,
        required: true,
        default: Date.now()
    }

});


const appliedscmodel = new mongoose.model('Appliedsc', appliedscScehma);
module.exports = appliedscmodel;