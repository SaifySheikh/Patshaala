const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const studentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    college:{
        type: String,
        required: true
        
    },
    streak:{
        type:Number,
        default: 0
    }
});

const studentModel = mongoose.model('Student', studentSchema);

module.exports = studentModel;
