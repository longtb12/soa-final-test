const knex = require('../connector')
const Joi = require('@hapi/joi')
var global = []

function schemaBooking() {
    return {
        task_id: Joi.number().required(),
        borrow_name: Joi.string().required(),
        borrow_date: Joi.string().required(),
        borrow_email: Joi.string().required(),
        book_id: Joi.string().required(),
        book_title: Joi.string().required(),
        return_date: Joi.string().required()
    }
}

async function insertOrder(params) {
    return knex('order').insert(params)
}

async function bookingProcess(params) {
    const { body } = params
    const schema = schemaBooking()
    const { error } = Joi.validate(body, schema)
    const verbosity = !error || error.details

    if (error) {
        return {
            success: false,
            message: '(╯°□°）╯︵ ┻━┻ missing or invalid params',
            verbosity
        }
    }
    try{
        global.push({
            taskId: body.task_id,
            status: 'Done',
            message: ''
        })
        await insertOrder(body)

        return {
            success: true,
            message: `Order successful`
        }
    }
    catch(err) {
        return {
            success: false,
            message: err.message
        }
    }
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

module.exports = { bookingProcess,checkStatus }