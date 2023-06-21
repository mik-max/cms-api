import mongoose from "mongoose";
const { Schema} = mongoose;

const setCoursesSchema = new Schema([{
     name: String,
     department: String
}]);

const courses = mongoose.model('courses', setCoursesSchema);
export default courses;