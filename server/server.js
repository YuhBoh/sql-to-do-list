// Require express - gives us a function
const express = require("express");

// Create an instance of express by calling the function returned above -
//gives us an object
const app = express();
const port = process.env.port || 3000;

// Require route to task.router.js.
// ASSIGN taskRouter to route "./routes/task.router.js"
const taskRouter = require("./routes/task.router.js");

// *parse* data sent from the client. To do this,
// we'll use a library bundled in Express called `body-parser`.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES
app.use(express.static("server/public"));

// YOU MAY NOW USE ROUTE taskRouter when CLIENT.JS
// USES URL:"/TASK".
app.use("/task", taskRouter); //COME BACK FOR REFERENCE

const pool = require("./modules/pool.js");

// Start up our server
app.listen(port, function () {
  console.log(`Server running at http://localhost:${port}`);
});
