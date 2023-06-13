import mongoose from "mongoose";
const { Schema} = mongoose;

const setTimetableSchema = new Schema([{
     title: String,
     courses: Array,
     createdBy: String,
     department: String,
     type: String,
}]);

const timetable = mongoose.model('timetable', setTimetableSchema);
export default timetable;