import mongoose from "mongoose";
const { Schema} = mongoose;

const setTimetableSchema = new Schema([{
     course: String,
     lecturer: String,
     assistingLecturer: String,
     startTime: String,
     endTime: String,
     day: String,
     studentPopulation: String
}]);

const createTimetable = mongoose.model('createTimeTable', setTimetableSchema);
export default createTimetable;