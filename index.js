//======================================================================
// Imports
//======================================================================

const express = require('express');
const app = express();
const db = require('./models/database.js');
const exphbs = require('express-handlebars');

const indexController = require('./controllers/index.controller.js');

//======================================================================
// Set up
//======================================================================

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);

//======================================================================
// Routes
//======================================================================

app.get('/', indexController.getIndex);

//======================================================================
// Init
//======================================================================

db.connectToDb();

app.listen(app.get('port'), () => {
    console.log(`Listening on localhost:${app.get('port')}`);
});