const express = require("express");
const router = express.Router();
const dbConnection = require("../database/connection");

const getAll = "SELECT * FROM users";
const getOne = "SELECT * FROM users WHERE id=?";
const createOne =
  "INSERT INTO users (first_name, last_name, email, created_at, updated_at, is_admin) VALUES(?, ?, ?, ?, ?, ?)";
const updateFirstnameOne =
  "UPDATE users SET first_name = ?, updated_at = ? WHERE id = ?";
const deleteOne = "DELETE FROM users WHERE id = ?";

const dateToday = new Date().toISOString().slice(0, 10);

// ROUTE "/"
router.get("/", (req, res) => {
  dbConnection.query(getAll, (err, result, fields) => {
    if (!err) {
      res.status(200).json(result);
    } else {
      res.status(500).send("Error saving the user");
    }
  });
});
router.post("/", (req, res) => {
  const { firstName, lastName, email } = req.body;
  // {
  //     "firstName":"Nora",
  //     "lastName":"Sumane",
  //     "email":"norah@inbox.lv"
  // }
  dbConnection.query(
    createOne,
    [firstName, lastName, email, dateToday, dateToday, false],
    (err, result, fields) => {
      if (!err) {
        res.location(`/${result.insertId}`).sendStatus(201);
      } else {
        res.status(500).send("Error saving the user");
      }
    }
  );
});

// ROUTE "/:id"
router.get("/:id", (req, res) => {
  dbConnection.query(getOne, [req.params.id], (err, result, fields) => {
    if (!err) {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(400).json({ message: "USER NOT FOUND" });
      }
    } else {
      res.status(500).send("Error saving the user");
    }
  });
});
router.put("/:id", (req, res) => {
  // {
  //     "firstName":"Alice",
  // }
  const id = parseInt(req.params.id);
  const { firstName } = req.body;
  dbConnection.query(
    updateFirstnameOne,
    [firstName, dateToday, id],
    (err, result, fields) => {
      if (!err) {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      } else {
        res.status(500).send("Error editing the user");
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  dbConnection.query(deleteOne, [id], (err, result, fields) => {
    if (!err) {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(202);
      }
    } else {
      res.status(500).send("Error editing the user");
    }
  });
});
module.exports = router;
