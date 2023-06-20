import mongoose from "mongoose";
const { Schema} = mongoose;

const setAssistantLecturersSchema = new Schema([{
     name: String,
}]);

const assistantLecturer = mongoose.model('assistantLecturer', setAssistantLecturersSchema);
export default assistantLecturer;