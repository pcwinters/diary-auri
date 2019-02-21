const express = require("express");
const next = require("next");
const api = require("./api");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;
app
  .prepare()
  .then(() => {
    const server = express();

    server.use("/api", api());
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
