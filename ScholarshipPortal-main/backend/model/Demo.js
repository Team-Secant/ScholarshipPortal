const mongoose =  require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verificationToken: {
        type: String
    },
    isVerified: {
        type: Boolean
    }
},
    {
        timestamps: true
    }
)

const demomodel = mongoose.model('Users',userSchema);
module.exports = demomodel;
