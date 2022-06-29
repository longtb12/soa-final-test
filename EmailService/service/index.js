require("dotenv").config();
const Joi = require('@hapi/joi')
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

function schemaMail() {
    return {
        to: Joi.string().required(),
        subject: Joi.string().required(),
        text: Joi.string().required()
    }
}

async function sendMail(params) {
    const { body } = params
    const schema = schemaMail()
    const { error } = Joi.validate(body, schema)
    const verbosity = !error || error.details

    if (error) {
        return {
            success: false,
            message: '(╯°□°）╯︵ ┻━┻ missing or invalid params',
            verbosity
        }
    }
    try {
        var mailOptions = {
            from: process.env.EMAIL_USER,
            to: body.to,
            subject: body.subject,
            text: body.text
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return {
            success: true,
            message: `Send mail successful`
        }
    }
    catch (err) {
        return {
            success: false,
            message: err.message
        }
    }
}

module.exports = { sendMail }