const express = require("express");
const router = express.Router();
const dbConnection = require("../database/connection");

const getAll = "SELECT * FROM users";
const getOne = "SELECT * FROM users WHERE id=?";
const getOneByEmail = "SELECT * FROM users WHERE email=?";
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
      res.status(200).json({ users: result });
    } else {
      res.status(500).send("Error saving the user");
    }
  });
});
router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email } = req.body;
  // {
  //     "firstName":"Nora",
  //     "lastName":"Sumane",
  //     "email":"norah@inbox.lv"
  // }
  dbConnection.query(getOneByEmail, [email], (err, result, fields) => {
    if (!err) {
      if (result.length === 0) {
        dbConnection.query(
          createOne,
          [firstName, lastName, email, dateToday, dateToday, false],
          (err, result, fields) => {
            if (!err) {
              res.json({
                status: 201,
                message: `Welcome, ${firstName}! Log in, please!`,
              });
            } else {
              res.json({ status: 500, error: err });
            }
          }
        );
      } else {
        res.json({
          status: 400,
          message: "You have already signed up with this email!",
        });
      }
    } else {
      res.json({ status: 500, error: err });
    }
  });
});

router.post("/signin", (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  // {
  //     "email":"norah@inbox.lv"
  // }
  dbConnection.query(getOneByEmail, [email], (err, result, fields) => {
    console.log(result.length);
    if (!err && result.length !== 0) {
      console.log(result);
      const formattedUser = {
        id: result[0].id,
        firstName: result[0].first_name,
        lastName: result[0].last_name,
        email: result[0].email,
        createdAt: result[0].created_at,
        updatedAt: result[0].updated_at,
      };
      // const jsonResponse =  formattedUser.json()
      res.json({ status: 201, user: formattedUser, message: `Hello, ${result[0].first_name}` });
    } else if (!err && result.length === 0) {
      res.json({
        status: 400,
        message: "Check your login information or sign up!",
      });
    } else {
      res.json({ status: 500, error: err });
    }
  });
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
