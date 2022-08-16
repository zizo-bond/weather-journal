//require express framework
const express = require('express');
//initiate an app instance from express
const app = express();

//setup the port
const port = 3000;

// Setup empty JS object to act as endpoint for every route
let projectData = {};

//configuring express to use body-parser as middle-ware.
app.use(express.json());//parse the json format to normal string;
app.use(express.urlencoded({ extended: false }));//is a body parser for html post form

// Initialize the main project folder
app.use(express.static("website"));

//setup cors module to enable server to listen to other requests.
const cors = require('cors');
//use the cors middleware
app.use(cors());

// post route
app.post('/add', async (req, res) => {
    const info = await req.body;
    projectData = info;
    res.send(projectData);
});


app.get("/all", async (req, res) => {
    if(projectData){
        res.send(projectData);
    }
});


//listening for the server 
app.listen(port, _=> console.log(`listening on port ${port}`));


