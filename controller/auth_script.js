const User = require('./../config/models/User')
const { v4: uuid4 } = require('uuid')
const { base64decode , base64encode } = require('nodejs-base64')

const bcrypt = require('bcrypt')
const { response } = require('express')

// const jwt = require('jsonwebtoken')
require('dotenv').config()


const authentication = () => {
    return {

        // login(req, res) {
        //     res.send("login.ejs")
        // },

        // signup(req, res) {
        //     res.render("signup.ejs")
        // },

        async postsignup(req, res) {
            try{

            
                var { username, password, email } = req.body

                if (!username || !password && !email) {
                    res.send('All fields are required')
                } else {

                    const salt = await bcrypt.genSalt(10);


                    encrypt_password = await bcrypt.hash(password, salt);

                    const user_in = new User({
                        username : username.trim(),
                        email : email,
                        password: encrypt_password,
                        invoices: []
                    })

                    const data = await user_in.save()

                    res.json({
                        data
                    })

                }
            }catch (err) {
                res.json({
                    status : false,
                    msg : err
                })
            }

        },

        async post_check(req, res) {

            User.exists({ username: req.body.username }, (err, results) => {
                if (results) {
                    res.json({
                        message : "Username already exists !",
                        input : "clear"
                    })
                    // res.send("Username already exists!");
                    // res.render('signupbox.ejs', { "message": "Username Already Exists !", "username": '', "error": '' });
                } else if (req.body.username.length < 3) {
                    res.json({
                        message : "Atleast 3 Characters Required !",
                        input : "clear"
                    })
                    // res.send("Atleast 3 Characters Required");
                    // res.render('signupbox.ejs', { "message": "Atleast 3 character required", "username": "", "error": '' })
                } else {
                    res.json({
                        message : "Username Available !",
                        input : null
                    })
                    // res.send("Username Available")
                    // res.render('signupbox.ejs', { "message": "Username Available ", "username": req.body.username, "error": err })

                }

            })

        },

        async post_login(req, res) {
            try{
                const { username, password } = req.body
                if (!username || !password) {
                    res.json({
                        status : false,
                        msg : "Invalid username or password"
                    })
                }
                const result = await User.findOne({ username: username })
                try {
                    const match = await bcrypt.compare(password, result.password)
                    if(match){
                        data = {
                            result
                        }
                        res.json(data)
                    }
                } catch (err) {
                    console.log(err)
                    res.json({
                        status : false,
                        msg : "User not found"
                    })
                }

            }catch(err){
                res.json({
                    status : false,
                    msg : err
                })
            }
            

        },
        async password_recovery_gateway(req, res) {
            try{
                const username = base64decode(req.params.username)
                data = {username}
                User.findOne({ username} , (err , result)=>{
                    if(result.email.search("@") > 0){
                        data = {
                            username,
                            type : "email" , 
                            field : result.email
                        }
                    }else{
                        data = {
                            username,
                            type : "question_query",
                            field : result.question_query
                        }
                    }
                    res.render('password_recovery_gateway.ejs' , data)
                })
            }catch(err){
                res.send("invalid username !")
            }
            
            
        },
    }

}

module.exports = authentication;