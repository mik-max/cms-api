import mongoose from "mongoose";
const { Schema} = mongoose;

const setAssistantLecturersSchema = new Schema([{
     name: String,
     department: String
}]);

const assistantLecturer = mongoose.model('assistantLecturer', setAssistantLecturersSchema);
export default assistantLecturer;