import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true,
        default: "Unknown"
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

const EmailModel = mongoose.models.email || mongoose.model('email',Schema);

export default EmailModel;