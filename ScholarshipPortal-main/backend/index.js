const express = require('express');
const mongodbconnection = require("./db");
const cors = require('cors');
const app = express();
const port = 5000;
// import DemoController from './routes/demoRegister'

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: true}));

app.use('/student', require('./routes/student'));
app.use('/faculty', require('./routes/faculty'));
app.use('/alumni', require('./routes/alumni'));
app.use('/othermember', require('./routes/othermember'));
app.use('/announcement', require('./routes/announcement'));
app.use('/scholarship', require('./routes/scholarship'));
app.use('/application', require('./routes/appliedsc'));
app.use('/dependant', require('./routes/stdependant'));

// app.use('/demoRegister', require('./routes/demoRegister'));


app.listen(port,()=>{
    console.log(`Scholarship Portal is working at http://localhost:${port}`)
})
mongodbconnection();