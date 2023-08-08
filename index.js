
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose'); 
mongoose.set('strictQuery', false);
const { registerUser, loginUser } = require('./controllers/auth');
;
const {dashBoardData} = require('./controllers/dashboard') ;
const {getUserData,getUserSocials} = require('./controllers/getUserData') ;
const {saveSocials, saveProfile,saveLinks} = require('./controllers/saveItems') ;
const {loadSocials,loadLinks} = require('./controllers/loadPrevious') ;

require('dotenv').config();


app.use(cors());
app.use(express.json());

const mongoUrl = process.env.DATABASE;



mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(error => {
  console.error('Error connecting to MongoDB:', error);
});


app.post('/api/register', registerUser);
app.post('/api/login', loginUser);

app.post('/data/dashboard', dashBoardData) ;

app.get('/get/:handle', getUserData);

//app.get('/get/socials/:handle', getUserSocials);

app.post('/save/socials', saveSocials); 
app.post('/save/profile', saveProfile); 
app.post('/save/links', saveLinks) ;
app.post('/load.socials', loadSocials) ;
app.post('/load/links', loadLinks) ;


const port = process.env.PORT || 8080;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})