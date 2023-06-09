import mongoose from 'mongoose';
import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import Cors from 'cors';
import timetable from './models/timtable.js';
import students from './models/students.js';
import venue from './models/venues.js';
import admin from './models/admin.js';
import courses from './models/courses.js';
import lecturer from './models/lecturers.js';
import assistantLecturer from './models/assistant_lecturer.js';


const jwt = jsonwebtoken
const app = express();

 //middlewares
 app.use(express.json());
 app.use(Cors());

 const port = process.env.PORT || 8000

 const connectionURL =`mongodb+srv://mikecodes:uiPass1820@cluster0.rlir7co.mongodb.net/computer_science_db?retryWrites=true&w=majority`
//  `mongodb+srv://aniah_admin:scholarly20@cluster0.mvkgsdd.mongodb.net/timetable-management?retryWrites=true&w=majority`
//  `mongodb+srv://mikecodes:uiPass1820@cluster0.rlir7co.mongodb.net/computer_science_db?retryWrites=true&w=majority`

  //DB config
mongoose.connect(connectionURL)

 //API endpoints
app.get('/', (req, res) => res.status(200).send('Hello CleverProgrammers!!!!!. CELZ4 API!!!🔥🔥'))

// creates a timetable
app.post('/api/v1/timetable/create', async(req, res) => {
     const body = req.body;
     try {
          if(body.courses && body.createdBy !== '' && body.department !== '' && body.title !=='' && body.type !== ''){
               await timetable.create(body)
               res.status(200).send({status:'Ok', data: null, message: 'Courses have been added successfully'})
          
          }else{
               res.status(400).send({status:'Failed', data: null, message: 'kindly fill all fields'})
          }
          
     } catch (error) {
          res.status(500).send({status: 'Failed', data: null, message : error.message})
     }

})

// gets all timetables
app.get('/api/v1/timetable', async(req, res) => {
     try {
          if(req.query.creator){
               let data = await timetable.find({createdBy:req.query.creator})
               res.status(200).send({status:'Ok', data: data, message: 'record fetched successfully'})
          }else if(req.query.department){
               
               let data = await timetable.find({department:req.query.department})
               res.status(200).send({status:'Ok', data: data, message: 'record fetched successfully'})
          }else{
               let data = await timetable.find()
               res.status(200).send({status:'Ok', data: data, message: 'record fetched successfully'})
          }
     } catch (error) {
          res.status(500).send({status: 'Failed', data: null, message : error.message})
     }
    
})
// gets a timetable by Id
app.get('/api/v1/timetable/:id', async(req, res) => {
     try {
          let id = req.params.id
          if(id){
               let data = await  timetable.findOne({_id: id})
               res.status(200).send({status:'Ok', data: data, message: 'record fetched successfully'})
          }else{
              res.status(400).send({status:'Failed', data: null, message: 'Id is missing'})
          }
     } catch (error) {
          res.status(500).send({status: 'Failed', data: null, message : error.message})
     }
    
})

// updates a timetable
app.put('/api/v1/timetable/update/:id', async(req, res) => {
     try {
          if(req.body && req.params.id){
               let id = req.params.id
               let gottenVenue = timetable.findOneAndUpdate({_id: id}, req.body).then(data => {
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
// deletes a timetable
app.delete('/api/v1/timetable/delete/:id', async(req, res) => {
     try {
          let id = req.params.id
          await timetable.findOneAndDelete({_id:id}).then(data => {
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

//creates a new course
app.post('/api/v1/courses/create', async(req, res) => {
     try {
          if(req.body.courses &&  req.body.courses !== [ ]){
               for(let i =0; i < req.body.courses.length; i++){

                    if(i !== req.body.courses.length -1 ){
                         await courses.create(req.body.courses[i]) 
                    }else{
                         await courses.create(req.body.courses[i])
                         res.status(200).send({status:'Ok', data: null, message: 'Courses have been created successfully'})
                    }
               }
               
          }else{
               res.status(400).send({status:'Failed', data: null, message: 'kindly pass in at least one course'})
          }
     } catch (error) {
          res.status(500).send({status: 'Failed', data: null, message : error.message})
     }

})
// gets all courses
app.get('/api/v1/courses', async (req, res) => {
    if(req.query.department){
          try {
               let data = await courses.find();
               res.status(200).send({status:'Ok', data: data, message: 'Record fetched successfully'}) 
          } catch (error) {
               res.status(500).send({status: 'Failed', data: null, message : error.message})
          }
    }else{
     res.status(400).send({status:'Failed', data: null, message: 'Department is required'})
    }
})



//creates a new lecturer
app.post('/api/v1/lecturers/create', async(req, res) => {
     try {
          if(req.body.lecturers && req.body.lecturers  !== [ ]){
               if(!req.query.isAssistant){
                    for(let i =0; i < req.body.lecturers.length; i++){

                         if(i !== req.body.lecturers.length -1 ){
                              await lecturer.create(req.body.lecturers[i]) 
                         }else{
                              await lecturer.create(req.body.lecturers[i])
                              res.status(200).send({status:'Ok', data: null, message: 'Lecturers have been created successfully'})
                         }
                    }
               }else{
                    for(let i =0; i < req.body.lecturers.length; i++){

                         if(i !== req.body.lecturers.length -1 ){
                              await assistantLecturer.create(req.body.lecturers[i]) 
                         }else{
                              await assistantLecturer.create(req.body.lecturers[i])
                              res.status(200).send({status:'Ok', data: null, message: 'Assistant lecturers have been created successfully'})
                         }
                    }
               }
               
               
          }else{
               if(!req.query.isAssistant){
                    res.status(400).send({status:'Failed', data: null, message: 'kindly pass in at least one lecturer'})
               }else{
                    res.status(400).send({status:'Failed', data: null, message: 'kindly pass in at least one assistant lecturer'})
               }
               
          }
     } catch (error) {
          res.status(500).send({status: 'Failed', data: null, message : error.message})
     }

})

// gets all lecturers
app.get('/api/v1/lecturers', async (req, res) => {
     if(!req.query.isAssistant){
          if(req.query.department){
               try {
                    let data = await lecturer.find({department:req.query.department});
                    res.status(200).send({status:'Ok', data: data, message: 'Record fetched successfully'}) 
               } catch (error) {
                    res.status(500).send({status: 'Failed', data: null, message : error.message})
               }
          }else{
               res.status(400).send({status:'Failed', data: null, message: 'Department is required'})
          }
     }else{
          if(req.query.department){
               try {
                    let data = await assistantLecturer.find({department:req.query.department});
                    res.status(200).send({status:'Ok', data: data, message: 'Record fetched successfully'}) 
               } catch (error) {
                    res.status(500).send({status: 'Failed', data: null, message : error.message})
               }
          }else{
               res.status(400).send({status:'Failed', data: null, message: 'Department is required'})
          }
     }
   
})

// students login
app.post('/api/v1/student/login', async (req, res) => {
     try {
         if(req.body.matricNumber !== ''){
               const student =  await students.findOne({matricNumber: req.body.matricNumber})
               
               if (student) {
                    let id = student._id.toString()
                    const token = jwt.sign({
                         matricNumber:  req.body.matricNumber
                    }, 'mikejwt$$')
                    let claims = {id: id, matricNumber: student.matricNumber, name: student.name, department: student.department, faculty:student.faculty}
                    res.status(200).send({status:'Ok', data: {token, claims}, message: 'Login is successful'}) 
               }else{
                    res.status(404).send({status:'Failed', data: null, message: 'You are not a student of this university!'})
               }
         }else{
               res.status(400).send({status:'Failed', data: null, message: 'kindly supply matric number'})
         }
     } catch (error) {
          res.status(500).send({status: 'Failed', data: null, message : error.message})
     }
    
 })
// creates an admin
 app.post('/api/v1/admin/create', async(req, res) => {
     const body = req.body;
     try {
          if(body.userName !==''  && body.password !== '' && body.role !==''){
               await admin.create(body)
               res.status(200).send({status:'Ok', data: null, message: 'admin has been created successfully'})
          }else{
               res.status(400).send({status:'Failed', data: null, message: 'kindly fill all fields'})
          }
     } catch (error) {
          res.status(500).send({status: 'Failed', data: null, message : error.message})
     }

})
// admin login
app.post('/api/v1/admin/login', async (req, res) => {
     try {
          
         if(req.body.userName !== '' && req.body.password !=''){
          console.log(req.body.userName, req.body.password)
               const user =  await admin.findOne({userName: req.body.userName, password: req.body.password})
               console.log(user)
               if (user) {
                    let id = user._id.toString()
                    let claims = {id: id, userName: user.userName, role: user.role, department: user.department}
                    const token = jwt.sign({
                         userName: req.body.userName
                    }, 'mikejwt$$')
                    res.status(200).send({status:'Ok', data: {token, claims}, message: 'Login is successful'}) 
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