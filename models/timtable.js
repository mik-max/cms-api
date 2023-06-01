import mongoose from "mongoose";
const { Schema} = mongoose;

const setTimetableSchema = new Schema([{
     courses: Array,
     createdBy: String,
     department: String
}]);

const timetable = mongoose.model('timetable', setTimetableSchema);
export default timetable;