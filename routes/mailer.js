const fs = require('fs');
const express = require('express');
const nodemailer = require('nodemailer')
require('dotenv').config();

const mailer = () => {
    return {
        send_mail(pdfBytes , emailto) {
            return new Promise((resolve, reject) => {
                let sender = "codebuddysync@gmail.com";
                // let text = `Dear User, the verification code for GeniePlay authentication is ${otp}`;
                let subject = "Inovice Generated !";
                var email = emailto;
                const start = new Date();
                const msg = {
                    from: sender,
                    to: email,
                    subject: subject,
                    // text: text,
                    subject: 'Invoice PDF Attachment',
                    text: 'Please find the attached PDF.',
                    attachments: [
                      {
                        filename: 'document.pdf',
                        content: pdfBytes,
                      },
                    ],
                };
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: sender,
                        // pass: "cuoxmwypdlceucfc"
                        pass: process.env.EmailPassKey
                    },
                    port: 465,
                    host: "smtp.gmail.com",
                });

                transporter.sendMail(msg, (err) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        const stop = new Date();
                        const req_sec = `${(stop - start)/1000} seconds..`;
                        const json_mail = {
                            status: true,
                            email_sent_to: email,
                            email_from: sender,
                            in_time: req_sec,
                        };
                        resolve(json_mail);
                    }
                });
            });
        },
    };
};


module.exports = mailer;
