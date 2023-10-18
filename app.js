import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import createError from "http-errors";
import logger from "morgan";
import { db } from "./db.js";
import { indexRouter } from "./routes/index.js";

const app = express();
app.use(cors());

config();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/", indexRouter);
db();
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).send(`An error occurred`);
});

// start listening on configured port
if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

export default app;
