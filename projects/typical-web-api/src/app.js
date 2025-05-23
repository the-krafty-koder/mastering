import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import path from "path";
import postRoutes from "./routes/posts.js";

dotenv.config(); // load environment variables into process.env
const app = express();

// view engine setup
app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json()); // parsing the request body to be used by req.body
app.use(express.urlencoded({ extended: false })); // parsing url encoded form data
app.use(cookieParser()); // parsing cookies to be used by request.cookies
app.use(express.static(path.join(process.cwd(), "public")));

app.use("/posts", postRoutes);

// catch 404 error and forward to error handler
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

if (process.env.NODE_ENV === "development") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err,
    });
  });
}

if (process.env.NODE_ENV === "production") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: {},
    });
  });
}

export default app;
