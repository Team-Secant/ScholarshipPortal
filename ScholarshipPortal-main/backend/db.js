const mongoose = require('mongoose');
const url = "mongodb+srv://teamsecant:Truol7KUHfFl4XtJ@cluster0.rrnv87c.mongodb.net/scholarshipPortal?retryWrites=true&w=majority";

const mongodbconnection = () => {
    mongoose.connect(url, () => {
        console.log("Connection to Mongodb for Scholarship Portal is Successfully made!")
    })
}
module.exports = mongodbconnection;