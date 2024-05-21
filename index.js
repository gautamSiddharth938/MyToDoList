const express = require('express')
var exphbs  = require('express-handlebars');
const app = express()
const path = require('path');
const port = process.env.PORT || 5000
const connecttoMongo = require('./db')
var cors = require('cors')
app.use(cors())

connecttoMongo()
app.use(express.json()) // Middleware for parsing JSON bodies
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});



// Available Routes
app.use('/api/bucket', require('./routes/bucket')) // /api/auth for handling user authentication
app.use('/api/todo', require('./routes/todo')) // /api/users to handle all the users related operations

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use(express.static(path.join(__dirname, 'views')))  
// app.use('/', require(path.join(__dirname, "/router/routers.js")))

app.listen(port, () => { 
    console.log(`My presonal Blogsite listening on port http://localhost:${port}`)
})








