const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json({limit:'200mb'}));
app.use(bodyParser.urlencoded({ limit:'200mb',extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));
const db = require("./config/database");
const users = require("./models/user");
const exercises = require("./models/exercise");
const workouts = require("./models/workout");
const {DataTypes} = require("sequelize");
const User = users(db,DataTypes);
const Exercise= exercises(db, DataTypes);
const Workout= workouts(db, DataTypes);


const healthTest = async () => {
    console.log("Testing the database connection..");
 
    // Test the connection.
    try {
       await db.authenticate();
       console.log("Connection has been established successfully.");
       
    } catch (error) {
       console.error("Unable to connect to the database:", error.original);
    }
 };

  /**
  * Initialize the application.
  */
healthTest();

app.use('/', routes);

app.get('/', (req, res) => {
   res.render('index', {pageTitle: "Home"});
 });

 app.get('/program', (req, res) => {
   res.render('program', {pageTitle: "Program"});
});


 db.sync().then((req) => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
    });
 