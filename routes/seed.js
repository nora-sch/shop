const express = require("express");
const router = express.Router();
const dbConnection = require("../database/connection");
const { faker } = require("@faker-js/faker");

const convertDate = (fakerDate) => {
  return fakerDate.toISOString().slice(0, 10);
};
const dateNow = new Date();

const postOne =
  "INSERT INTO users (first_name, last_name, email, created_at, updated_at, is_admin) VALUES(?, ?, ?, ?, ?, ?)";

// ROUTE "/"
router.get("/", (req, res) => {
  for (let i = 0; i < 10; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const createdAt = faker.date.past(); // 2022-12-20T16:45:59.757Z
    const updatedAt = faker.date.between({ from: createdAt, to: dateNow });
    const createdAtToDate = convertDate(createdAt); // YYYY-MM-DD
    const updatedAtToDate = convertDate(updatedAt);
    const isAdmin = faker.datatype.boolean({ probability: 0.2 });
    dbConnection.query(
      postOne,
      [firstName, lastName, email, createdAtToDate, updatedAtToDate, isAdmin],
      (err, result, fields) => {
        if (!err) {
            console.log(firstName,lastName, email, createdAtToDate , updatedAtToDate, isAdmin);
        } else {
          res.status(500).send("Error saving the user");
        }
      }
    );
  }
});

module.exports = router;
