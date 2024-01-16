const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const student = require("./student");
const { stringify } = require("querystring");


const tutorSchema = new mongoose.Schema({
    studentid:{
        type:String
    },
    subject:{
        type:String
    },
    notes: [{
        link: {
            type: String
        },
        title: {
            type: String
        },
        caption: {
            type: String
        }
    }],
    videos: [
        {
            type: String
        }
    ]
});

const tutorModel = mongoose.model('Tutor', tutorSchema);

module.exports = tutorModel;
