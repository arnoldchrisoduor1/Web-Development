const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const members = require('./Members');
const logger = require('./Middleware/logger')

const app = express();

// Init middleware
// app.use(logger);

//Handlebars middleware.
// Handlebars middleware.
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');


// Body parse middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));


// Home Page Route.
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));


// setting a static folder.
app.use(express.static(path.join(__dirname, 'public')));


//Members API routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port... ${PORT}`));