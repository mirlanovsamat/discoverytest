import mongoose from "mongoose";

const Upload = new mongoose.Schema({
    name: {type: String},
    mimetype: {type: String},
    size: {type: Number}
})

export default mongoose.model('Uploads', Upload)