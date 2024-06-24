const dbConfig = require("../configs/dbConfig.json").database;
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

module.exports = db = {};

(async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database } = dbConfig;

  try {
    // connect to db
    const sequelize = new Sequelize(database, user, password, {
      host,
      dialect: "mysql",
      dialectOptions: {},
      pool: {
        max: 25, // maximum number of connection in pool
        min: 0, // minimum number of connection in pool
        acquire: 5000, // maximum time, in milliseconds, that a connection can be idle before being released
        idle: 5000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
      },
      retry: {
        match: [
          /ETIMEDOUT/, // Connection timeout error
          /EHOSTUNREACH/, // Server is unreachable error
          /ECONNRESET/, // Connection reset by peer error
          /ECONNREFUSED/, // Connection refused error
          /ETIMEDOUT/, // Socket timeout error
          /EHOSTUNREACH/, // Host is unreachable error
          /EPIPE/, // Broken pipe error
          /EAI_AGAIN/, // DNS lookup timed out
        ],
        max: 10, // maximum number of retries
      },
      reconnect: {
        maxRetries: 10, // Maximum number of reconnect attempts
        delay: 500, // Delay between each reconnect attempt in milliseconds
      },
      logging: (message) => {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp} - ${message}`); // logging format

        //capturing connection details and measuring connection time
        if (message.startsWith("Executing (default):")) {
          const connectionTime = new Date() - sequelize.options.queryStartTime;
          console.log(`Connection time: ${connectionTime}ms`);
        }
      },
    });
    //export connection object
    db.sequelize = sequelize;

    // init models and add them to the exported db object
    db.Employee = require("../models/Employee.model.js")(sequelize);
    db.Leave = require("../models/Leave.model.js")(sequelize);

    // sync all models with database
    await sequelize.sync();
    console.log(
      "API connected to the database successfully and all the models synced"
    );
  } catch (e) {
    console.error("Database error: ", e);
  }
})();
