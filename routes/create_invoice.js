const app = require('express').Router();

const User = require("../config/models/User")
const Invoice = require("../config/models/Invoice")


app.get('/getInvoice/:userid' , async(req,res)=>{
    try{
        const {userid} = req.params
        const data = await User.findOne({_id : userid})
        const invoiceList = data.invoices
        const temp = []
        for(let i = 0 ; i < invoiceList.length ; i++){
            const d = await Invoice.findOne({_id : invoiceList[i]})
            temp.push(d)
        }

        res.json({
            data : temp
        })


    }catch(err){
        console.log(err);
        res.json({
            status : false,
            msg : err
        })
    }
})

module.exports = app