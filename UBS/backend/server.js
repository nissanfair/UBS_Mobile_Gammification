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

// === Importing Routes ===
const topicRoute = require('./routes/topicroutearchived')
const progressRoute = require('./routes/progressRoute')

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

// === Routes === 
app.use('/6bit/topics',topicRoute)

// Swagger UI
app.use('/6bit-api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));




// ==== Defining Port Number, similar to the flask run application ====
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))