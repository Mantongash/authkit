const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connect = require("./src/db/connect");
const fs = require("fs");

const userRoutes = require("./src/routes/userRoutes")
const app = express();
dotenv.config();

const PORT = process.env.PORT;

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1", userRoutes)
// const routes = fs.readdirSync("./src/routes");
// routes.map((route) => {
//   //   const routeName = route.split(".")[0];
//   // Dynamic import
//   const routePaths = require(`./src/routes/${route}`)
//   app.use(`/api/1`, routePaths);
// });
// console.log(routes);
const server = async () => {
  try {
    await connect();
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error", error.message);
    process.exit(1);
  }
};

server();
