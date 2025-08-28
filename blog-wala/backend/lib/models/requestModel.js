import mongoose from "mongoose";

let requestSchema = new mongoose.Schema({

    fullname:{
        required:true,
        type:String
    },

    company:{
         required:true,
         type:String
    },

    email:{
        required:true,
        type:String
    },  
    password:{
        required:true,
        type:String
    },
    status:{
        type:String,
        default:"pending"
    },
    buissnessType:{
        type:String,
        required:true
        
    }
}, {timestamps:true});

export default  mongoose.model("Request" , requestSchema);