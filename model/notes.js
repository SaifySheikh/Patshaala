const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tutor = require("./tutor");


const notesSchema = new mongoose.Schema({
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

const notesModel = mongoose.model('Notes', notesSchema);

module.exports = notesModel;
