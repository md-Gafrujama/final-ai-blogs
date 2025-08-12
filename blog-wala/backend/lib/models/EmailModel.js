import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        required:true
    }
})

const EmailModel = mongoose.models.email || mongoose.model('email',Schema);

export default EmailModel;