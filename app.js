const express = require('express');
const app = express();

const mongoose = require('./database/mongoose')

const TaskList = require('./database/models/tasklist');
const Task = require('./database/models/task');

/*
CORS - Cross Origin Request Security
Backend - http://localhost:3000
Frontend - http://localhost:4200
*/
// 3rd party library, app.use(cors())
// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Pass to next layer of middleware
    next();
});

// Example of middleware
app.use(express.json()); // Or 3rd party bodyParser

// Routes or REST API Endpoints or RESTFul webservices End points
/* 
TaskList - Create, Update, ReadTaskListByid, ReadAllTaskList
Task - Create, Update, ReadTaskByid, ReadAllTask
*/

// Routes or REST API Endpoints for taskList model
// Get All Task Lists
// http://localhost:3000/tasklists => [{TaskList}, {}]
//https://www.restapitutorial.com/lessons/httpmethods.html

app.get('/tasklists', (req, res) => {
    TaskList.find({})
        .then((lists) => {
            res.status(200).send(lists);
        })
        .catch((error) => {
            console.log(error);
            res.status(500);
        });
});

//endpoint to get tasklist by Id : http://localhost:3000/tasklists/614d2f09d188e92c006c7c3e
app.get(
    '/tasklists/:tasklistId', (req, res) => {
        let tasklistId = req.params.tasklistId;
        TaskList.find({ _id: tasklistId})
            .then((tasklist) => {
                res.status(200).send(tasklist);
            })
            .catch((error) => {
                console.log(error);
            })
    }
);


// Route or Endpoint for creating a TaskList
app.post('/tasklists', (req, res) => {
    //console.log("Hello i am inside the postman methode");
    console.log(req.body);

    let taskListObj = { 'title' : req.body.title};
    TaskList(taskListObj).save()
        .then((taskList) => {
            res.status(201).send(taskList);
        })
        .catch((error) => {
            console.log(error);
            res.status(500);
        });
});

// Full update
app.put('/tasklists/:tasklistId', (req, res) => {
    TaskList.findOneAndUpdate({ _id: req.params.tasklistId}, { $set: req.body})
    .then((tasklist) => {
        res.status(200).send(tasklist);
    })
    .catch((error) => {
        console.log(error);
    })
})

// partial update
app.patch('/tasklists/:tasklistId', (req, res) => {
    TaskList.findOneAndUpdate({ _id: req.params.tasklistId}, { $set: req.body})
    .then((tasklist) => {
        res.status(200).send(tasklist);
    })
    .catch((error) => {
        console.log(error);
    })
});

// Delete a tasklist by id
app.delete('/tasklists/:tasklistId', (req, res) => {
    TaskList.findByIdAndDelete(req.params.tasklistId)
    .then((tasklist) => {
        res.status(200).send(tasklist);
    })
    .catch((error) => {
        console.log(error);
    })
});

/*app.listen(3000, function(){
    console.log('Server started on port 3000');
});*/

app.listen(3000, () => {
    console.log('Server started on port 3000 great');
});