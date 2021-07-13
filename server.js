const express = require("express");
const connectDB = require("./config/db");

const app = express();
// initialise Middleware
app.use(express.json({ extended: false }));
// Connect to Database
connectDB();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Welcome to Ezos Family Contact"));
// Cors fix
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, x-auth-token"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
// initialising Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contact"));

app.listen(PORT, () => {
  console.log(`server Started at Port ${PORT}`);
});
