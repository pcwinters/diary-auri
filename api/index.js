const { Router } = require("express");
const submission = require("./submission");
module.exports = function() {
  const router = Router();
  router.use("/submission", submission());
  return router;
};
