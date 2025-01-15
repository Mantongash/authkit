const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.get("/", (req, res) => res.send("Authkit API"));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
