const { Router } = require("express");
const { Submission, Answer } = require("../models");
const bodyParser = require("body-parser");
const moment = require("moment");
module.exports = function() {
  const router = Router();

  router.get("/", (req, res) => {
    Submission.findAll({ include: [{ model: Answer, as: "answers" }] }).then(
      submissions => {
        res.json(submissions.map(s => s.toJSON()));
      }
    );
  });
  router.post("/", bodyParser.json(), function(req, res) {
    const hour = moment().hour();
    if (hour < 17) {
      res.status(500).send("Submit between 5pm and midnight");
      return;
    }
    Submission.create(req.body, {
      include: [
        {
          model: Answer,
          as: "answers"
        }
      ]
    })
      .then(submission => res.status(200).json(submission))
      .catch(err => {
        res.status(500).json(err);
      });
  });
  return router;
};
