const express = require("express");
const router = express.Router();
const User = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../fetchUser");
const privateKey = "fi9uh3fvuyw34ifugy43fci04gjche";

router.post(
  "/createuser",
  [
    body("name", "The name should be atleast 3 characters").isLength({
      min: 3,
    }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array });
    }
    try {
      let user = await User.find({ email: req.body.email });
      if (user.length != 0) {
        return res.status(400).json({
          success,
          error:"User with this email already exist"
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        userName: req.body.name,
        email: req.body.email,
        password: hash,
      });

      const unique = {
        user: {
          id: user.id,
        },
      };
      const jwtToken = jwt.sign(unique, privateKey);
      res.status(200).json({
        success: true,
        token: jwtToken,
      });
    } catch (err) {
      res.status(500).json({
        success,
        error: "Some Internal Server error",
      });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can not be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array });
    }
    try {
      const { email, password } = req.body;
      const user = await User.find({ email: email });
      if (user.length == 0) {
        return res
          .status(400)
          .json({ success, error: "Please enter correct login details" });
      }
      const result = await bcrypt.compare(password, user[0].password);
      if (!result) {
        return res
          .status(400)
          .json({ success, error: "Please enter correct login details" });
      }
      const unique = {
        user: {
          id: user[0].id,
        },
      };
      const jwtToken = jwt.sign(unique, privateKey);
      res.status(200).json({
        success: true,
        token: jwtToken,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success,
        error: "Some Internal Server error",
      });
    }
  }
);

router.post("/getuser", fetchUser, async (req, res) => {
  let sucess = false;
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success,
      error: "Internal Server error",
    });
  }
});

module.exports = router;
