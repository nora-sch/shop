const express = require("express");
const router = express.Router();
const dbConnection = require("../database/connection");

const getAll = "SELECT * FROM users";
const getOne = "SELECT * FROM users WHERE id=?";
const getOneByEmail = "SELECT * FROM users WHERE email=?";
const createOne =
  "INSERT INTO users (first_name, last_name, email, created_at, updated_at, is_admin, avatar) VALUES(?, ?, ?, ?, ?, ?, ?)";
const updateFirstnameOne =
  "UPDATE users SET first_name = ?, updated_at = ? WHERE id = ?";
const deleteOne = "DELETE FROM users WHERE id = ?";
const createCart = "INSERT INTO carts (products) VALUES(?)";
const updateCart = "UPDATE carts SET products = ?  WHERE id = ?";
const deleteCart = "DELETE FROM carts WHERE id = ?";
const deleteCartTableContent = "TRUNCATE carts";
const getCart = "SELECT * FROM carts WHERE id=?";
const getFavorites = "SELECT favorites FROM favorites WHERE id=?";
const updateFavorites = "UPDATE favorites SET favorites = ?  WHERE id = ?";
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
  const { firstName, lastName, email, avatar } = req.body;
  // {
  //     "firstName":"Nora",
  //     "lastName":"Sumane",
  //     "email":"norah@inbox.lv",
  //     "avatar":"http://res.cloudinary.com/cloudinarynora/image/upload/v1688478682/Capture_d_%C3%A9cran_du_2023-07-02_22-01-56_p3unio.png"
  // }
  dbConnection.query(getOneByEmail, [email], (err, result, fields) => {
    if (!err) {
      if (result.length === 0) {
        dbConnection.query(
          createOne,
          [firstName, lastName, email, dateToday, dateToday, false, avatar],
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
        avatar: result[0].avatar,
      };
      // const jsonResponse =  formattedUser.json()
      res.json({
        status: 201,
        user: formattedUser,
        message: `Hello, ${result[0].first_name}`,
      });
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

// router.post("/:id/cart", async (req, res) => {
//   const { userCart } = req.body;
//   const productIdsTable = userCart.map((product) => product.id);
//   const productIdsJson = JSON.stringify(Object.assign({}, productIdsTable));
// console.log(productIdsTable);
//   dbConnection.query(getCart, [1], (err, result, fields) => {
//     if (!err && result.length === 0) {
//       dbConnection.query(
//         createCart,
//         // `[${productIdsTable}]`,
//         [`[${productIdsTable}]`],
//         (err, result, fields) => {
//           res.json({ status: 200, message: "ok" });
//           if (!err) {
//           } else {
//             res.json({ status: 500, error: err });
//           }
//         }
//       );
//     } else if (!err && result.length === 1) {
//       // dbConnection.query(updateCart, [null, 1], (err, result, fields) => {
//       //   if (!err) {
//           dbConnection.query(
//             updateCart,
//             [`[${productIdsTable}]`, 1],
//             (err, result, fields) => {
//               if (!err) {
//                 console.log(result);
//                 res.json({
//                   status: 200,
//                   message: `Item, ${userCart.title} added to cart!`,
//                 });
//               } else {
//                 console.log(err);
//                 res.json({ status: 500, error: err });
//               }
//             }
//           );
//         // } else {
//         //   console.log(err);
//         //   res.json({ status: 500, error: err });
//         // }
//       // });
//     } else {
//       console.log(err);
//       res.json({ status: 500, error: err });
//     }
//   });
// });

router.post("/:id/cart", async (req, res) => {
  const { cart } = req.body;

  const productIdsTable = cart.map((product) => product.id);
  console.log(productIdsTable);
  // const productIdsJson = JSON.stringify(Object.assign({}, productIdsTable));
  dbConnection.query(deleteCartTableContent, (err, result, fields) => {
    if (!err) {
      dbConnection.query(
        createCart,
        [`[${productIdsTable}]`],
        (err, result, fields) => {
          if (!err) {
            console.log(result);
            res.json({
              status: 200,
              message: `Your cart is saved. Don't forget to save it after every modification!`,
            });
          } else {
            console.log(err);
            res.json({ status: 500, error: err });
          }
        }
      );
    } else {
      res.json({ status: 500, error: err });
    }
  });
});

router.get("/:id/cart", async (req, res) => {
  dbConnection.query(getCart, [1], (err, result, fields) => {
    if (!err) {
      console.log(result);
      res.status(200).json({
        status: 200,
        message: `Your local cart has been updated from database!`,
        cart: result[0].products,
      });
    } else {
      console.log(err);
      res.json({ status: 500, error: err });
    }
  });
});

router.get("/:id/favorites", (req, res) => {
  dbConnection.query(getFavorites, [1], (err, result, fields) => {
    if (!err) {
      // console.log(result[0].favorites)
      res.status(200).json({ favorites: result[0].favorites });
    } else {
      res.status(500).send("Error searching the favorites of user");
    }
  });
});
router.put("/:id/favorites", async (req, res) => {
  //   {
  //     "favorite": {
  //         "id": 7,
  //         "title": "White Gold Plated Princess",
  //         "price": 9.99,
  //         "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
  //         "category": "jewelery",
  //         "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
  //         "rating": {
  //             "rate": 3,
  //             "count": 400
  //         }
  //     }
  // }

  const { favoriteProduct } = req.body;
  console.log(req.body)
  const favoriteProductId = favoriteProduct.id;

  dbConnection.query(getFavorites, [1], (err, result, fields) => {
    if (!err) {
      let newFavoritesArray;
      const currentFavorites = result[0].favorites;
      if (!currentFavorites || !currentFavorites.includes(favoriteProductId)) {
        !currentFavorites
          ? (newFavoritesArray = [])
          : (newFavoritesArray = currentFavorites);
        newFavoritesArray.push(favoriteProductId);
      } else {
        newFavoritesArray = currentFavorites.filter(
          (fav) => fav !== favoriteProductId
        );
      }
      dbConnection.query(
        updateFavorites,
        [`[${newFavoritesArray}]`, 1],
        (err, result, fields) => {
          if (!err) {
            res.json({
              status: 200,
              favorite: favoriteProduct,
            });
          } else {
            console.log(err);
            res.json({ status: 500, error: err });
          }
        }
      );
    } else {
      console.log(err);
      res.json({ status: 500, error: err });
    }
  });
});
module.exports = router;
