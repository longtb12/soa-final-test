const moment = require('moment');
const apiAdapter = require('./apiAdapter')
const api = apiAdapter('http://localhost:4444')
var global = []

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function createNoteRemind(request) {
    var { body } = request;
    var returnDate = moment(body.returnDate);
    var isAlert = false;

    global.push({
        taskId: body.task_id,
        status: 'Wait',
        message: 'Wait'
    })

    while (!isAlert) {
        var now = new Date();
        var diffInMinutes = returnDate.diff(now, 'minutes');
        var diffInSeconds = returnDate.diff(now, 'seconds') - 60*diffInMinutes;

        var task = global.find(x => x.taskId == body.task_id);
        task.message = 'Wait in ' + diffInMinutes + 'minutes and '+ diffInSeconds + 'seconds';

        if (diffInMinutes <= 5) {
            isAlert = true;
            var reqEmail = {
                task_id: body.task_id,
                to: body.borrow_email,
                subject: 'Borrow book',
                text: 'ok'
            }
            resp = await sendMail(reqEmail);
            task.message = 'Sent email!';
            task.status = 'Done!';
        }
        await sleep(1000);
    }

    return true;
}

async function sendMail(request) {
    api.post('/email', request).then(resp => {
        return resp.data;
    })
        .catch(err => {
            console.log(err.message)
            return null;
        })
}

async function checkStatus(params) {
    const {body} = params
    const task = global.find(x => x.taskId == body.task_id);
    if(task == undefined || task == null) {
        return {
            status: 'No'
        };
    }
    return {
        status: task.status,
        message: task.message
    };
}

module.exports = { createNoteRemind, checkStatus }