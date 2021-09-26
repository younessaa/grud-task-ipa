const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minLength: 3
    },
    _taskListId: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    completed: {
        type: Boolean,
        default: false,
        require: true
    }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;