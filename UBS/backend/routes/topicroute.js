const express = require('express')
const router = express.Router()
// Just need to import this to the routes, if we want to access the firebase. 
const admin = require("firebase-admin");
// 1. Define the path first 
// 2. Define the params. The params here would be the request and the response object
// 3. REQUEST --> Normally for POST
// 4. RESPOND --> Normally for GET, what you want the server to respond to 

// [GET] route for topic questions
router.get('/totalquizzes', function (req, res) {
    try {
        const itemsRef = admin.database().ref("Quiz");
        itemsRef.once('value', function(snapshot,error) {

            if (error) {
                res.status(500).send({
                    error:"No data found at the specified location"
                })
            } else if (snapshot.val() === null) {
                res.status(404).send({
                    error: "No data is found at the specified location in the database. Did you type correctly?"
                })
            } else {
                res.status(200).json(
                {   
                    // Seems very draggy, this is for the frontend 
                    totalnumber: Object.keys(snapshot.val()).length,
                    topics: Object.keys(snapshot.val()).length/3,
                    mainbody: snapshot.val()
                });
            }
        });
    }
    catch(err) {
        res.status(500).send({ error: 'Error retrieving data from Firebase, does the given params exist?' });
    }
});

// [GET] route for topics with params
router.get('/:topic', function (req, res) {

    var topicParams = req.params.topic;
    try {
        const itemsRef = admin.database().ref('Quiz').orderByKey().startAt(`${topicParams}_`).endAt(`${topicParams}_\uf8ff`)
        console.log("hehe")
        console.log(itemsRef)
        itemsRef.once('value', function(snapshot,error) {

            console.log(snapshot.val());
            if (error) {
                res.status(500).send({
                    error:"No data found at the specified location"
                })
            } else if (snapshot.val() === null) {
                res.status(404).send({
                    error: "No data is found at the specified location in the database. Did you type correctly?"
                })
            } else {
                res.status(200).json(
                {   
                    data: snapshot.val()
                });

            }
        });
    }
    catch(err) {
        res.status(500).send({ error: 'Error retrieving data from Firebase, does the given params exist?' });
    }
});


// =========================================================================================================================================================================================
//  === Template [GET]===
// router.get('/', (req, res) => {
//     res.send(
//         { msg: "welcome my dudes" }
//     )

// })
// ==== Template [GET] with parameters ====
// router.get('/:singleroute', (req, res) => {
//     res.json(
//         { msg: "Single workout" }
//     )
// })

// === Template [POST] with JOI. Usage of JOI to validate whether fields are field in correctly
router.post('/api/courses', (req, res) => {
    // Schema checks name property of the req body
    console.log(req.body)
    // Creation of a schema to check for the required parameters needed 
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    // Check 
    const result = schema.validate(req.body)
    // See the key value pairs for the result. If error, the error field will be populated, if value is true this will not be populated at all 
    console.log(result)

    // If the validation fails 
    if (result.error) {
        console.log(req.body)
        res.status(404).send(
            {
                code: res.statusCode,
                message: result.error.details[0].message
            }
        )
        return
    }
    else {
        res.status(200).send(
            {
                code: res.statusCode,
                message: result.value
            }
        )
        return

    }
})

// Always need to include this at the end of the page
module.exports = router;



// FAQ
// You may ask whats the different between res.json vs res.send, both methods are the same, nothing much here
// Apparently res.json worwks like res.send, and it converts non-objects to json as well. 