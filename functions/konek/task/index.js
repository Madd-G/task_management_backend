const { addTaskMessage } = require('./addTaskMessage')
const { addTask } = require('./addTask')
const { deleteTask } = require('./deleteTask')
const { updateTaskPriority } = require('./updateTaskPriority')
const { updateTaskProgress } = require('./updateTaskProgress')
const { updateTaskStatus } = require('./updateTaskStatus')
const { updateTaskIsRead } = require('./updateTaskIsRead')
const { updateTaskDeadline } = require('./updateTaskDeadline')
const { sendNotification } = require('./sendNotification')

module.exports = {
    addTaskMessage,
    addTask,
    deleteTask,
    updateTaskPriority,
    updateTaskProgress,
    updateTaskStatus,
    updateTaskIsRead,
    updateTaskDeadline,
    sendNotification,
};
