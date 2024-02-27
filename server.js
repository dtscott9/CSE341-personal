const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const app = express();
const port = process.env.PORT || 3000;
const { auth, requiresAuth } = require('express-openid-connect');
require("dotenv").config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app.use(auth(config));

app
  .get("/", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
  })
  .get("/profile", requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });

  app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", requiresAuth(), require("./routes"))
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))


mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Web Server is listening at http://localhost:${port}/`);
    });
  }
});
