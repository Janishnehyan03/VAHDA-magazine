const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const blogRoute = require("./routes/blog");
const userRoute = require("./routes/user");
const categoryRoute = require("./routes/category");
const authorRoute = require("./routes/author");
const morgan = require("morgan");

dotenv.config();
// database connection
mongoose.connect(process.env.MONGO_URI, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to database");
  }
});

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true
}));

app.use("/api/v1/blogs", blogRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/authors", authorRoute);

app.use((err, req, res, next) => {
  console.log('error', err);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
