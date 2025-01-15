const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Hello from the server");
});

module.exports = router;
