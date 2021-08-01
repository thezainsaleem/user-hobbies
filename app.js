const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'User Hobbies APIs',
      description: 'CRUD APIs for users and hobbies',
      contact: {
        name: "Zain Saleem"
      },
      server: ["http://localhost:3000"]
    }
  },
  apis: ['routes/\*.*', 'routes/user/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose.connect(
  process.env.MONGO_CONNECTION_STRING,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const port = process.env.PORT || 3000;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

require("./routes/user.routes")(app);
require("./routes/user/hobby.routes")(app);


app.listen(port, () => {
  console.log(`Started at localhost:${port}`);
});

module.exports = app;