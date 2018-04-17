var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var commCfg = require('./server/config/environment/comm')
var app = express()






var router = require('./client/server')
app.set('views', path.join(__dirname, 'client'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser("abc"))
app.use(express.static(path.join(__dirname, 'client'), { maxAge: 0 }))
app.set('port', 9000)

app.use('/',router)
app.listen(app.get('port'), function() {
    console.log('请打开浏览器localhost: ' + app.get('port'))
})
