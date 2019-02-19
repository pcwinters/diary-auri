const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const models = require("./models");

const PORT = process.env.PORT || 3000;
app
  .prepare()
  .then(() => {
    const server = express();

    server.get("/submissions/", (req, res) => {
      models.Submission.findAll().then(submissions => {
        res.send(submissions.map(s => s.toJSON()));
      });
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Woot. Ready on http://localhost:${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
