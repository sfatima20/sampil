import mongoose from "mongoose";

const userSchema  = mongoose.Schema({
   email: {type: String, required:true, unique:true}, // unique is used to speed operations in the database
   password: {type: String, required: true}
});

export default mongoose.model('User', userSchema);
