// POST/COMMENT 전용 REST ENDPOINT
const express = require("express");
const models = require("./models");
const app = express();
const PORT = 3000;
app.use(express.json());
// route add

// add route
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("DB connected");
    })
    .catch(() => {
      console.error("DB error");
      process.exit();
    });
});
