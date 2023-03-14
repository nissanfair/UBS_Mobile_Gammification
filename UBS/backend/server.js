
// start of Backend server initialisation 
const Joi = require('joi');
const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')
const app = express();
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "API",
            version: "1.0.0"
        }
    },
    apis: ['server.js','./routes/testingroute.js'],
};
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
require('dotenv').config()
const cors = require("cors")
const YAML = require('yamljs')
const swaggerDocs = YAML.load('swaggerapi.yaml');
const testingRoute = require('./routes/topicroute');
const progressRoute = require('./routes/progressRoute');

// === Initialisation of Firebase materials ===
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://is483-ecd48-default-rtdb.asia-southeast1.firebasedatabase.app"
});
const db = admin.database();


// === Usage of app.use, app.use creates a new middleware ===
// Express json parses any incoming request to be in json format
app.use(express.json())
// CORS initialisation
app.use(cors())

// Grabs all the necessary stuff from testingroute.js and puts it here
// We can define the routes here. Over here, we declare /6bit/testing/.. Anything after that would be based on the routes in testingRoutes
app.use('/6bit/topics',testingRoute)

// Swagger UI
// Can be improved and be put into a yaml file
app.use('/6bit-api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));


// /*

// Testing route 
app.post('/items', (req, res) => {
    console.log(req.body)
    // If no key or table specified, it would create a unique key (E.g -NJY_kpyq2dR9TAuNHQ4).
    // db.ref('data/-NJY_kpyq2dR9TAuNHQ4').push(req.body);
    // In order to set the table name we would need to use set. However use this only if a new "table" is needed
    // db.ref('data').child("testingitem").set({
    //     name: "Gun",
    //     description: "AK47"
    // })
    // If you want to update have to use the update clause

    
    db.ref('data/testingitem').update(req.body)
    res.send(req.body);
  });

 // ------------------------------ Start of Login Route ----------------------------------------------------------------
// import statements 
// import {useDispatch, useSelector} from 'react-redux';
// import {useNavigate} from 'react-router-dom';
// import {setloginStatus, setuserData, setuserName} from "../src/Redux/loginSlice";
// import React, { useEffect, useState, useRef } from 'react'

//  const navigation = useNavigation(); 
//  let dispatch = useDispatch();
//  let userDataRedux= useSelector((state) => state.login.userData)
//  let userNameRedux= useSelector((state) => state.login.userName)
//  let loginStatusRedux= useSelector((state) => state.login.loginStatus)

 app.put('/login', (req, res) => {
    const userData = req.body;
    console.log("This is for PUT" ,userData)
    try{
        const itemsRef = admin.database().ref("Character/" + userData.id);
        itemsRef.once('value', function(snapshot,error){
            console.log(snapshot.val())
            if(snapshot.val() !== null){
                itemsRef.update({
                    isLoggedin: true
                });
                res.status(200).json({});
            }

            else if (snapshot.val() === null) {
                res.status(404).send({
                    error: "No data is found at the specified location in the database. Did you type correctly?"
                })
            } else {
                res.status(500).send({
                    error:"No data found at the specified location"
                });
            }
        });
        }

        catch(err) {
            res.status(500).send({ error: 'Error retrieving data from Firebase, does the given params exist?' });
        }
    // db.ref('data/testingitem').update(req.body)
    res.send(req.body);
  });


app.post('/login', (req, res) => {
    const userData = req.body;
    console.log("This is for POST" ,userData)
    try{
        const charactersRef = admin.database().ref('Character');
        charactersRef.child(userData.id).set(userData)
        .then(() => {
            console.log('Data saved to Firebase');
        })
        .catch((error) => {
            console.error('Error saving data to Firebase:', error);
        });
    }
    catch(err){
        res.status(500).send({ error: 'Error retrieving data from Firebase, does the given params exist?' });
    }
});





  //------------------------------ End of Login Route ----------------------------------------------------------------

// ==== Defining Port Number, similar to the flask run application ====
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))