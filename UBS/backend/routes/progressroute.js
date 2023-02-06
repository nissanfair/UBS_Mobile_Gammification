const express = require('express')
const router = express.Router()
// Just need to import this to the routes, if we want to access the firebase. 
const admin = require("firebase-admin");
// 1. Define the path first 
// 2. Define the params. The params here would be the request and the response object
// 3. REQUEST --> Normally for POST
// 4. RESPOND --> Normally for GET, what you want the server to respond to 

// [GET] route for topic questions
router.get('/topicStatus', function (req, res) {
    try {
        const itemsRef = admin.database().ref("Character/123456/Topic_Progress");
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
                    topic_status: Object.keys(snapshot.val())
                });
            }
        });
    }
    catch(err) {
        res.status(500).send({ error: 'Error retrieving data from Firebase, does the given params exist?' });
    }
});

// Always need to include this at the end of the page
module.exports = router;



// FAQ
// You may ask whats the different between res.json vs res.send, both methods are the same, nothing much here
// Apparently res.json worwks like res.send, and it converts non-objects to json as well. 