const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

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

app.use('/api/v1/' , managerPDF);

app.get("/" , (req,res)=>{
    res.json({
        status : true,
    })
})

const port = process.env.PORT || 3500;

const listener = app.listen(port, () => {
    console.log("http://127.0.0.1:" + port);
});
