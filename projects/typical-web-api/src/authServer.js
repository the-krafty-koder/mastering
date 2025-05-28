import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import fs from "fs";
import https from "https";
import path from "path";
import passport from "passport";
import flash from "express-flash";
import session from "express-session";
import routes from "./routes/index.js";
import authRoutes from "./routes/auth.js";
import initialize from "./config/passport.js";
import { getUsers } from "./config/db.js";

dotenv.config(); // load environment variables into process.env
initialize(
  passport,
  (email) => {
    return getUsers().find((user) => user.email === email);
  },
  (id) => getUsers().find((user) => user.id === id)
);
const app = express();

// view engine setup
app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json()); // parsing the request body to be used by req.body
app.use(express.urlencoded({ extended: false })); // parsing url encoded form data
app.use(cookieParser()); // parsing cookies to be used by request.cookies
app.use(express.static(path.join(process.cwd(), "public")));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes);
app.use("/auth", authRoutes);

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

const options = {
  key: fs.readFileSync("../ssl/privKey.pem"),
  cert: fs.readFileSync("../ssl/catalog.cert"),
};
const PORT = process.env.PORT || 4000;

https.createServer(options, app).listen(PORT, () => {
  console.log("Server running on 4000");
});
