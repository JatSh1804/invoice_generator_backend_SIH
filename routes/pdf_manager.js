const app = require('express').Router();
const ejs = require('ejs');
const pdf = require('html-pdf')

const mailer = require("./mailer")


function formatDateToYYMMDD() {
    const currentDate = new Date();
    const year = currentDate.getFullYear() % 100; // Get the last two digits of the year
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(currentDate.getDate()).padStart(2, '0'); // Add leading zero if needed
  
    return `${month}/${day}/${year}`;
}
  
  

app.get('/generatePdf/:emailto' , (req,res)=>{
    const {emailto} = req.params
    const {
        cmpName ,
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
    try {

        const formattedDate = formatDateToYYMMDD();

        const data = {
            company : {
                name : "Amazon Web Exchange",
                address : "312 street New York Times",
                city : "london",
                pin : "872683",
                contactNumber : "+91 8784892324"
            },
            invoiceId : "91297379813",
            date : formattedDate,
            billInfo : {
                name : "Rahul Singh",
                cmp : "Jio Pvt LTD",
                address : "Mumbai Road",
                city : "Mumbai",
                pin : "111092",
                phone : "917397912",
                email : "test@gmail.com"

            },

            serviceCharges : [
                {
                    service : "Service Fee",
                    amount : 300
                },

                {
                    service : "labour % hours at $75/hr",
                    amount : 900
                },

                {
                    service : "New Client Discount",
                    amount : -60
                },

                {
                    service : "Tax (4.25% after discount)",
                    amount : 100
                }
            ]
          
        };
    
        ejs.renderFile('views/invoice.ejs', data, async(err, htmlContent) => {
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
                mailer().send_mail(buffer , emailto).then((res) => {
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