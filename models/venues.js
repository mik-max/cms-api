import mongoose from "mongoose";
const { Schema} = mongoose;

const setVenueSchema = new Schema([{
     name: String,
     capacity: Number
}]);

const venue = mongoose.model('venue', setVenueSchema);
export default venue;