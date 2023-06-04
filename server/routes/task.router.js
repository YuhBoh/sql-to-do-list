const express = require("express");
const router = express.Router();

// DONT'T FORGET TO ADD const pool.
// module.exports = pool IS NOT ENOUGH TO CONNECT.
const pool = require("../modules/pool");

// POST FIRST TO POST INTO DATABASE
router.post("/", (req, res) => {
  console.log("we got", req.body);

  let taskRow = req.body.task;

  let sqlText = `
    INSERT INTO "toDoList"
      ("tasks", "completion")
      VALUES
      ($1, FALSE);
  `;
  let sqlValues = [taskRow];

  pool
    .query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.log("POST /task error:", dbErr);
      res.sendStatus(500);
    });
});

// GET NEXT TO GET DATABASE TO DOM
// GO TO CLIENT FIRST.
// What's your job?
// 1. Sit patiently and wait for an HTTP request
//    addressed to GET /creatures.
// 2. Use a SQL query to ask the database for the
//    creatures data.
// 3. Wait for the query result to come back from
//    the database.
// 4. After the query result comes back, I send the
//    rows of data back to the client as an HTTP
//    response.
router.get("/", (req, res) => {
  console.log("GET /task");

  //  Write SQL query that picks data we want
  //  when it's running on toDoList database:
  let sqlText = 'SELECT * FROM "toDoList" ORDER BY "id" DESC;';

  // Send query to database:
  pool
    .query(sqlText)
    //dbRes is what data will come back as.
    .then((dbRes) => {
      console.log("dbRes.rows:", dbRes.rows);
      let theTasks = dbRes.rows;
      res.send(theTasks);
    })
    .catch((dbError) => {
      console.log("/GET SQL failed:", dbErr);
      res.sendStatus(500);
    });
});

router.delete("/:id", (req, res) => {
  console.log(req.params);

  // 1. Find which task to delete
  // What id to delete?
  let theIdToDelete = req.params.id;

  // 2. Use SQL query to delete task in database.
  let sqlText = `
    DELETE FROM "toDoList"
      WHERE "id"=$1;
  `;
  let sqlValues = [theIdToDelete];

  pool
    .query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.log("task.router DELETE ERROR:", dbErr);
      res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
  // Get id of task we'd like to update:
  // req.params looks like: { id: '3' }
  let theIdToUpdate = req.params.id; //ASK: WHERE PARAMS COME FROM

  // Get the new completion value:
  // req.body looks like: { completion: 'TRUE' }
  let newCompletion = req.body.completion; //ASK: WHERE BODY COME FROM

  let sqlText = `
    UPDATE "toDoList"
      SET "completion"=$1
      WHERE "id"=$2;
  `;

  let sqlValues = [newCompletion, theIdToUpdate];

  pool
    .query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.log("task.router Update Failure");
      res.sendStatus(500);
    });
});

module.exports = router;
