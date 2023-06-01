import mongoose from "mongoose";
const { Schema} = mongoose;

const setStudentSchema = new Schema([{
     matricNumber: String,
     department: String,
     faculty: String,
     name: String
}]);

const students = mongoose.model('students', setStudentSchema);
export default students;