// userController.js

// const User = require('../models/user');

// exports.getUser = async (req, res) => {
//   const userId = req.params.userId;
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).send({ message: 'User not found' });
//     }
//     return res.status(200).send({ user });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send({ error: 'Internal server error' });
//   }
// };

/*
In this example, we define a controller for retrieving a user's data from the database. The controller exports a single function getUser that accepts a request and response object. The controller function retrieves the userId from the request parameters, uses the User model to query the database, and returns a response to the client.

Using a controller allows us to separate the business logic from the routing and HTTP request handling. We can also reuse this controller function in different parts of the application, or even in different applications, by simply importing the module and calling the function.

By comparison, here's an example of using a more traditional approach where the routing, request handling, and business logic are all combined in a single file:
*/

// routes.js

// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');

// router.get('/users/:userId', async (req, res) => {
//   const userId = req.params.userId;
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).send({ message: 'User not found' });
//     }
//     return res.status(200).send({ user });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send({ error: 'Internal server error' });
//   }
// });

// module.exports = router;

// In this example, the routing, request handling, and business logic are combined in a single file. This can make the code more difficult to read, test, and maintain, especially as the application grows larger.

// Using a controller can help you organize your code better, make it more modular and maintainable, and easier to test.



