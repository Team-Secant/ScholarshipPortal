const mongoose = require('mongoose');

const scholarshipScehma = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },
    sctype: {
        type: String,
        required: true,
    },
    minincome: {
        type: String,
        required: true,
    },
    mincgpa: {
        type: String,
        required: true,
    },
    award: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default:true
    },
    lastdate:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
        default: Date.now()
    }

});


const scholarshipmodel = new mongoose.model('Scholarship', scholarshipScehma);
module.exports = scholarshipmodel;