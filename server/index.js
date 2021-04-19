const dotenv= require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT=process.env.PORT || 8080;
const cors=require('cors');
const routes = require('./routes/movies-router')
const db=require('./DB')
const path=require('path');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

db.on('error',()=>{console.log('mongodb connection error:')})

app.listen(PORT,()=>{
    console.log(`sever is up on port ${PORT}`);
})

app.use('/movies',routes)