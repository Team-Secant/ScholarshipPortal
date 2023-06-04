const mongoose = require('mongoose');

const annoucementScehma = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
        default: Date.now()
    }

});


const announcementmodel = new mongoose.model('Annoucement', annoucementScehma);
module.exports = announcementmodel;