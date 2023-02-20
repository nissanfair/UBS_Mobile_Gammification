const express = require('express')
const router = express.Router()
const admin = require("firebase-admin");

// Controllers
const topicController = require("../controllers/topiccontroller")


// Requests 
router.get('/totalquizzes', topicController.getTotalQuizzes);
router.get('/:topic', topicController.getSpecificTopic);