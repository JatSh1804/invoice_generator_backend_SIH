const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

require('./config/database')()

// Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Adding url encoders
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())
// public access
app.use(express.static(path.join(__dirname, 'public')))




const managerPDF = require("./routes/pdf_manager")
const auth = require("./routes/auth/auth")
const create_invoice = require("./routes/create_invoice")

app.use('/api/v1/' , managerPDF);
app.use('/api/v1/' , auth);
app.use('/api/v1/' , create_invoice);

app.get("/" , (req,res)=>{
    res.json({
        status : true,
    })
})

const port = process.env.PORT || 3500;

const listener = app.listen(port, () => {
    console.log("http://127.0.0.1:" + port);
});
