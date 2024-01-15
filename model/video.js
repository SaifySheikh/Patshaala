const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tutor = require("./tutor");


const videoSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    tutorid:{
        type:Schema.Types.ObjectId,
        ref:'tutor'
    },
    url:{
        type:String
    }
    
});

const videoModel = mongoose.model('Video', videoSchema);

module.exports = videoModel;
