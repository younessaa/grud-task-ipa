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

app.get('/taskslists', (req, res) => {
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
app.get('/taskslists/:tasklistId', (req, res) => {
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
app.post('/taskslists', (req, res) => {
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
app.put('/taskslists/:tasklistId', (req, res) => {
    TaskList.findOneAndUpdate({ _id: req.params.tasklistId}, { $set: req.body})
    .then((tasklist) => {
        res.status(200).send(tasklist);
    })
    .catch((error) => {
        console.log(error);
    })
})

// partial update
app.patch('/taskslists/:tasklistId', (req, res) => {
    TaskList.findOneAndUpdate({ _id: req.params.tasklistId}, { $set: req.body})
    .then((tasklist) => {
        res.status(200).send(tasklist);
    })
    .catch((error) => {
        console.log(error);
    })
});

// Delete a tasklist by id
app.delete('/taskslists/:tasklistId', (req, res) => {

    // delete all tasks withing a tasklist if that tasklist is deleted
    const deleteAllContainingTask = (tasklist) => {
        Task.deleteMany({_taskListId : req.params.tasklistId})
            .then(() => {return tasklist})
            .catch((error) => { console.log(error) });
    }

    const responseTaskList = TaskList.findByIdAndDelete(req.params.tasklistId)
        .then((tasklist) => {
            deleteAllContainingTask(tasklist);
        })
        .catch((error) => {
            console.log(error);
        })

    res.status(200).send(responseTaskList);
});

/* CRUD operation for task, a task should always belong to a tasklist */
// Get all tasks for 1 tasklist, http://localhost:3000/tasklists/:tasklistid/tasks/
app.get('/taskslists/:tasklistId/tasks', (req, res) => {
    Task.find({_taskListId: req.params.tasklistId})
        .then((tasks) => {
            res.status(200).send(tasks);
        })
        .catch((error) => {
            console.log(error);
        })
});

// create a task inside a tasklist
app.post('/taskslists/:tasklistId/tasks', (req, res) => {
    //console.log("Hello i am inside the postman methode");
    console.log(req.body);

    let taskObj = { 'title' : req.body.title, '_taskListId' : req.params.tasklistId};
    Task(taskObj).save()
        .then((task) => {
            res.status(201).send(task);
        })
        .catch((error) => {
            console.log(error);
            res.status(500);
        });
});

// Get 1 task from 1 tasklist, http://localhost:3000/tasklists/:tasklistid/tasks/:taskid
app.get('/taskslists/:tasklistId/tasks/:taskId', (req, res) => {
    Task.findOne({_taskListId: req.params.tasklistId, _id: req.params.taskId})
        .then((tasks) => {
            res.status(200).send(tasks);
        })
        .catch((error) => {
            console.log(error);
        })
});
// http://localhost:3000/tasklist/:tasklistid/tasks/:taskid

// update 1 task belonging to 1 tasklist
app.patch('/taskslists/:tasklistId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({ _taskListId: req.params.tasklistId, _id: req.params.taskId}, { $set: req.body})
    .then((task) => {
        res.status(200).send(task);
    })
    .catch((error) => {
        console.log(error);
    })
});

// delete 1 task belonging to 1 tasklist
app.delete('/taskslists/:tasklistId/tasks/:taskId', (req, res) => {
    Task.findOneAndDelete({ _taskListId: req.params.tasklistId, _id: req.params.taskId})
    .then((task) => {
        res.status(200).send(task);
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