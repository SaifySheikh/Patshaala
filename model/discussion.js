const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const discussionSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true
    }
    
});

const discussionModel = mongoose.model('discussion', discussionSchema);

module.exports = discussionModel;
