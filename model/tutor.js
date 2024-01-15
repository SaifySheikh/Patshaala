const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const student = require("./student");


const tutorSchema = new mongoose.Schema({
    studentid:{
        type:Schema.Types.ObjectId,
        ref:'student'
    },
    notes: [
        {
           type: String
        }
    ],
    videos: [
        {
            type: String
        }
    ]
});

const tutorModel = mongoose.model('Tutor', tutorSchema);

module.exports = tutorModel;
