import mongoose from "mongoose";
const { Schema} = mongoose;

const setAdminSchema = new Schema([{
     userName: String,
     password: String,
     role: String
}]);

const admin = mongoose.model('admin', setAdminSchema);
export default admin;