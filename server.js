const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const app = express();
const port = process.env.PORT || 8080;

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"))
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Web Server is listening at http://localhost:${port}/`);
    });
  }
});
