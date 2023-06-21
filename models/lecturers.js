import mongoose from "mongoose";
const { Schema} = mongoose;

const setLecturersSchema = new Schema([{
     name: String,
     department: String
}]);

const lecturer = mongoose.model('lecturer', setLecturersSchema);
export default lecturer;