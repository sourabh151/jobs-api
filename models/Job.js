const mongoose = require("mongoose");

const job = new mongoose.Schema({
    company: {
        type: String,
        required:[true,"please provide name of company"],
        maxlength:50
    },
    position: {
        type: String,
        required:[true,"please provide name of position"],
        maxlength:100
    },
    status:{
        type:String,
        enum:["interview","pending","cancelled"],
        validate: {
            validator:function(v){
                return ["interview","pending","cancelled"].includes(v)
            },
            message:"{VALUE} is not a valid value for status field",
        },

        default:"pending"
    },
    createdBy:{
        type : mongoose.Types.ObjectId,
        ref:"User",
        required:[true,"please provide owner id of the job"]
    }
})
// const job = await Job.findOne({ /* query */ });
// await job.populate('createdBy').execPopulate();
// console.log(job.createdBy); // prints the related User document
module.exports = mongoose.model("Job", job);
