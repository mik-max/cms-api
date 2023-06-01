import mongoose from 'mongoose';
import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import Cors from 'cors';
import createTimetable from './models/timtable.js';
import students from './models/students.js';
import venue from './models/venues.js';
import admin from './models/admin.js';



const jwt = jsonwebtoken
const app = express();

 //middlewares
 app.use(express.json());
 app.use(Cors());

 const port = process.env.PORT || 8000

 const connectionURL = `mongodb+srv://mikecodes:uiPass1820@cluster0.rlir7co.mongodb.net/computer_science_db?retryWrites=true&w=majority`

  //DB config
mongoose.connect(connectionURL)

 //API endpoints
app.get('/', (req, res) => res.status(200).send('Hello CleverProgrammers!!!!!. CELZ4 API!!!🔥🔥'))

// creates a course
app.post('/api/v1/course/create', async(req, res) => {
     const body = req.body;
     try {
          if(body.course !==''  && body.lecturer !=='' && body.assistingLecturer !=='' && body.startTime!=='' && body.endTime !== '' && body.day !== '' && body.studentPopulation !== ''){
               await createTimetable.create(body)
               res.status(200).send({status:'Ok', data: null, message: 'Course has been added successfully'})
          }else{
               res.status(400).send({status:'Failed', data: null, message: 'kindly fill all fields'})
          }
     } catch (error) {
          res.status(500).send({status: 'Failed', data: null, message : error.message})
     }

})

// gets all courses
app.get('/api/v1/course', async(req, res) => {
     try {
          let data = await createTimetable.find()
          res.status(200).send({status:'Ok', data: data, message: 'record fetched successfully'})
     } catch (error) {
          res.status(500).send({status: 'Failed', data: null, message : error.message})
     }
    
})
// updates a course
app.put('/api/v1/course/update/:id', async(req, res) => {
     try {
          if(req.body && req.params.id){
               let id = req.params.id
               let gottenVenue = createTimetable.findOneAndUpdate({_id: id}, req.body).then(data => {
                    if(!data){
                         res.status(400).send({status:'Failed', data: null, message: 'course not found'})
                    }else{
                         console.log(data)
                         res.status(200).send({status:'Ok', data: null, message: 'course has been updated successfully'})
                    }
               })
          
          }else{
               res.status(400).send({status:'Failed', data: null, message: 'kindly fill all fields'})
          }
          
     } catch (error) {
          res.status(500).send({status: 'Failed', data: null, message : error.message})
     }
})
// deletes a course
app.delete('/api/v1/course/delete/:id', async(req, res) => {
     try {
          let id = req.params.id
          await createTimetable.findOneAndDelete({_id:id}).then(data => {
               if(!data){
                    res.status(400).send({status:'Failed', data: null, message: 'course not found'})
               }else{
                    console.log(data)
                    res.status(200).send({status:'Ok', data: null, message: 'course has been deleted successfully'})
               }
          })
     } catch (error) {
          res.status(500).send({status: 'Failed', data: null, message : error.message})
     }
})

//creates a venue
app.post('/api/v1/venue/create', async(req, res) => {
     const body = req.body;
     try {
          if(body.name !==''  && body.capacity > 0){
               await venue.create(body)
               res.status(200).send({status:'Ok', data: null, message: 'venue has been created successfully'})
          }else{
               res.status(400).send({status:'Failed', data: null, message: 'kindly fill all fields'})
          }
     } catch (error) {
          res.status(500).send({status: 'Failed', data: null, message : error.message})
     }

})

// gets all venues
app.get('/api/v1/venue', async(req, res) => {
     try {
          let data = await venue.find()
          res.status(200).send({status:'Ok', data: data, message: 'record fetched successfully'})
     } catch (error) {
          res.status(500).send({status: 'Failed', data: null, message : error.message})
     }
    
})
// updates a venue
app.put('/api/v1/venue/update/:id', async(req, res) => {
     try {
          if(req.body && req.params.id){
               let id = req.params.id
               let gottenVenue = venue.findOneAndUpdate({_id: id}, req.body).then(data => {
                    if(!data){
                         res.status(400).send({status:'Failed', data: null, message: 'venue not found'})
                    }else{
                         console.log(data)
                         res.status(200).send({status:'Ok', data: null, message: 'venue has been updated successfully'})
                    }
               })
          
          }else{
               res.status(400).send({status:'Failed', data: null, message: 'kindly fill all fields'})
          }
          
     } catch (error) {
          res.status(500).send({status: 'Failed', data: null, message : error.message})
     }
})


// students login
app.post('/api/v1/student/login', async (req, res) => {
     try {
         if(req.body.matricNumber !== ''){
               const student =  await students.findOne({matricNumber: req.body.matricNumber})
               let id = student._id.toString()
               if (student) {
                    const token = jwt.sign({
                         matricNumber:  req.body.matricNumber
                    }, 'mikejwt$$')
                    let claims = {id: id, matricNumber: student.matricNumber, name: student.name, department: student.department, faculty:student.faculty}
                    res.status(200).send({status:'Ok', data: {token, claims}, message: 'Login is successful'}) 
               }else{
                    res.status(404).send({status:'Failed', data: null, message: 'You are not a member of this faculty!'})
               }
         }else{
               res.status(400).send({status:'Failed', data: null, message: 'kindly supply matric number'})
         }
     } catch (error) {
          res.status(500).send({status: 'Failed', data: null, message : error.message})
     }
    
 })
// admin login
app.post('/api/v1/admin/login', async (req, res) => {
     try {
         if(req.body.userName !== '' && req.body.password !=''){
               const admin =  await admin.findOne({userName: req.body.userName, password: req.body.password})
               if (admin) {
                    const token = jwt.sign({
                         userName: req.body.userName
                    }, 'mikejwt$$')
                    res.status(200).send({status:'Ok', data: {token: token}, message: 'Login is successful'}) 
               }else{
                    res.status(404).send({status:'Failed', data: null, message: 'You are not an admin'})
               }
         }else{
               res.status(400).send({status:'Failed', data: null, message: 'kindly supply username and password'})
         }
     } catch (error) {
          res.status(500).send({status: 'Failed', data: null, message : error.message})
     }
    
 })


 //listener
 app.listen(port, () => console.log(`Listening on localhost: ${port}`));