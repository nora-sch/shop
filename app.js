const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
app.use(express.json()); 
const seedRouter = require("./routes/seed");
const userRouter = require("./routes/user");

app.get("/", (req, res) => {
  res.send("SHOP");
});
app.use("/users", userRouter);
app.use("/seed", seedRouter);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
