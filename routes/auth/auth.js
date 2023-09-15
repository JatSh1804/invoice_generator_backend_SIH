const app = require("express").Router()
const auth = require("../../controller/auth_script")

// app.get('/login', auth().login)
app.post('/login', auth().post_login)
// app.get('/signup', auth().signup)
app.post('/signup', auth().postsignup)

// app.get('/password_recovery_gateway/:username' , auth().password_recovery_gateway)
// app.get('/check_answer/:username/:answer' , auth().check_answer)
// app.post('/change_password/:key' , auth().recreate_user_password)
// app.get('/check_otp/:otp/:enc_otp/:username/' , auth().check_otp)

module.exports = app