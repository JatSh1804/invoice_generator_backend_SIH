const app = require('express').Router();
const ejs = require('ejs');
const pdf = require('html-pdf')
const { v4: uuid4 } = require('uuid')

const mailer = require("./mailer")


function formatDateToYYMMDD() {
    const currentDate = new Date();
    const year = currentDate.getFullYear() % 100; // Get the last two digits of the year
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(currentDate.getDate()).padStart(2, '0'); // Add leading zero if needed

    return `${month}/${day}/${year}`;
}



app.get('/generatePdf/:emailto', (req, res) => {
    const emailto=req.query.email
    console.log(req.query)
    const {
        cmpName,
        cmpAddress,
        cmpCity,
        cmpPin,
        cmpContactNumber,
        invoiceId,
        date,
        billName,
        billCmp,
        billAddress,
        billCity,
        billPin,
        billPhone,
        billEmail
    } = req.body;
    // console.log()
    try {

        const formattedDate = formatDateToYYMMDD();

        const data = {
            company: {
                name: "Amazon Web Exchange",
                address: "312 street New York Times",
                city: "london",
                pin: "872683",
                contactNumber: "+91 8784892324"
            },
            invoiceId: uuid4(),
            date: formattedDate,
            billInfo: {
                name: req.query.data.customerName,
                cmp: "Jio Pvt LTD",
                address: req.query.data.address,
                city: "Mumbai",
                pin: req.query.data.Pin,
                phone: req.query.data.PhoneNo,
                email: req.query.email,
                TotalAmount: req.query.data.totalAmount
            },
            serviceCharges: req.query.data.itemPurchased,


        };

        ejs.renderFile('views/invoice.ejs', data, async (err, htmlContent) => {
            if (err) {
                console.log(err)
                return res.status(500).send('Internal Server Error');
            }

            const options = { format: 'Letter' };

            pdf.create(htmlContent, options).toBuffer((err, buffer) => {
                if (err) {
                    console.error('Error:', err);
                    res.status(500).send('PDF Generation Failed');
                } else {
                    res.setHeader('Content-Type', 'application/pdf');
                    res.setHeader('Content-Disposition', 'inline; filename=output.pdf');
                    res.send(buffer);
                    mailer().send_mail(buffer, emailto).then((res) => {
                        console.log(res);
                    }).catch((err) => {
                        console.error(err);
                    });
                }
            });


        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})




module.exports = app;