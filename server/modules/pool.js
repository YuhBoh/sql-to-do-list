// Configure a tool that will allow us to:
// 1. Connect to our database.
// 2. Send queries to our database.
// 3. Receive query results from our database.

//Boilerplate
//Import pg library:
const pg = require("pg");
// Create a vending machine that dispenses
// pool objects:
const Pool = pg.Pool;

//Boilerplate
// 1. Use the pool-dispening machine to obtain a
//    pool object.
// 2. Configure the "pool" object to be able
//    to connect to our database, which is running
//    at localhost:5432:
const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "weekend-to-do-app",
});

// Spit out a console log when the pool connects
// successfully:
pool.on("connect", () => {
  console.log("pool connected postgres database");
});

pool.on("error", (error) => {
  console.log(`There is an`, error);
});

module.exports = pool;
