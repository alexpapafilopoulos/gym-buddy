const express = require('express');
const app = express();
const port = 3000;
const db = require("./config/database");
const users = require("./models/user");
const {DataTypes} = require("sequelize");
const User = users(db,DataTypes);

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

 db.sync().then((req) => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
    });
 