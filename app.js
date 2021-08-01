const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
mongoose.connect(
  process.env.MONGO_CONNECTION_STRING,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
const port = process.env.PORT || 3003;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.listen(port, () => {
  console.log(`Started at localhost:${port}`);
});
