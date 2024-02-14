import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true, 'Company name is required']
    },
    position:{
        type: String,
        required: [true, "Position is required"],
        maxlength: 100
       
    },
    status:{
        type: String,
        enm: ["pending", "rejected", "interview"],
        default: "pending"
    },
    workType:{
        type: String,
        enm: ["Full-time","Part-time", "Contract", "Internship"],
        default: "Full-time"

    },
    workLocation:{
        type: String,
        required: [true, "Location is required"],
        default: "Islamabad"
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    }
},{timestamps: true})

export default mongoose.model("Job", jobSchema)