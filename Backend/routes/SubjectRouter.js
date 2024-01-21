const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const subject = require("../Models/subjectSchema");
const fetchUser = require("../fetchUser");
router.get("/subjects", fetchUser, async (req, res) => {
  try {
    const data = await subject.find({ userId: req.user.id });
    res.send(data);
  } catch (err) {
    res.status(500).send("Some error occured");
  }
});

router.post(
  "/subjects",
  fetchUser,
  [
    body("subject", "Subject can't be blank").isLength({ min: 1 }),
    body("present", "Present attendance can't be blank").exists(),
    body("total", "Total attendance can't be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.errors });
    }
    try {
      const newData = new subject({
        userId: req.user.id,
        subject: req.body.subject,
        present: +req.body.present,
        total: +req.body.total,
      });
      const response = await newData.save();
      res.json(response);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error occured");
    }
  }
);

router.put(
  "/subjects/:id",
  fetchUser,
  [
    body("subject", "Subject can't be blank").exists(),
    body("present", "Present attendance can't be blank").exists(),
    body("total", "Total attendance can't be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.errors });
    }
    try {
      const id = req.params.id;

      let data = await subject.find({ _id: id });
      if (data.length === 0) {
        return res.status(400).json({
          success,
          error: "Not found",
        });
      }

      if (data[0].userId.toString() !== req.user.id) {
        return res.status(401).json({
          success,
          error: "Not authorized",
        });
      }
      const newSubject = {
        subject: req.body.subject,
        present: +req.body.present,
        total: +req.body.total,
      };
      const updatedData = await subject.findByIdAndUpdate(
        id,
        {
          $set: newSubject,
        },
        { new: true }
      );
      res.json({
        success: true,
        updatedData,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success,
        error: "Some internal error",
      });
    }
  }
);

router.delete("/subjects/:id", fetchUser, async (req, res) => {
  let success = false;
  try {
    const id = req.params.id;
    let data = await subject.find({ _id: id });
    if (data.length === 0) {
      return res.status(400).json({
        success,
        error: "Not found",
      });
    }

    if (data[0].userId.toString() !== req.user.id) {
      return res.status(401).json({
        success,
        error: "Not authorized",
      });
    }
    data = await subject.findByIdAndDelete(id);
    res.send({
      success: true,
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success,
      error: "Error",
    });
  }
});

module.exports = router;
