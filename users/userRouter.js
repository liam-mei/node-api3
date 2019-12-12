const express = require("express");
const userDb = require("./userDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  // post a new user
  const { name } = req.body;
  userDb
    .insert({ name })
    .then(name => {
      res.status(201).json(name);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "error saving user", err });
    });
});

router.post("/:id/posts", (req, res) => {
  // post a post with userId
});

router.get("/", (req, res) => {
  // get all users
  userDb
    .get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ err, errMessage: "error retrieving users" }));
});

router.get("/:id", validateUserId, (req, res) => {
  // get user with id
  const { id } = req.params;
  userDb
    .getById(id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ err, errMessage: "error receving users" }));
});

router.get("/:id/posts", (req, res) => {
  // get all posts of userId
});

router.delete("/:id", (req, res) => {
  // delete user with id
});

router.put("/:id", (req, res) => {
  // update user with id
});

//custom middleware

// validateUserId validates the user id on every request that expects a user id parameter
// if the id parameter is valid, store that user object as req.user
// if the id parameter does not match any user id in the database,
//    cancel the request and respond with status 400 and { message: "invalid user id" }
function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  userDb
    .getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(err => {
      console.log("get user by id err:", err);
      return res.status(400).json({ message: "Error Retrieving User" });
    });
}

// validateUser validates the body on a request to create a new user
// if the request body is missing, cancel the request and respond with status 400 and { message: "missing user data" }
// if the request body is missing the required name field,
    // cancel the request and respond with status 400 and { message: "missing required name field" }
function validateUser(req, res, next) {
  // do your magic!
  const { name } = req.body;
  // Body is always defined so I don't know why we're testing for this
  if (!req.body) return res.status(400).json({ message: "missing user data" });
  if (!name) return res.status(400).json({ message: "missing required name field" });
  next();
}

// validatePost validates the body on a request to create a new post
// if the request body is missing, cancel the request and respond with status 400 and { message: "missing post data" }
// if the request body is missing the required text field,
    // cancel the request and respond with status 400 and { message: "missing required text field" }
function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
