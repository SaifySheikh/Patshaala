const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const meetSchema = new mongoose.Schema({
    url:{
        type:String
    }
});

const meetModel = mongoose.model('Meet', meetSchema);

module.exports = meetModel;
