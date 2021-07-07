const express = require("express");
const connectDB = require("./config/db");

const app = express();
// initialise Middleware
app.use(express.json({ extended: false }));
// Connect to Database
connectDB();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Welcome to Ezos Family Contact"));

// initialising Routes

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contact"));

app.listen(PORT, () => {
  console.log(`server Started at Port ${PORT}`);
});
