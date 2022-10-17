const express = require("express");
const path = require("path");

const actorRouter = require("./routes/actorRoutes");
const movieRouter = require("./routes/movieRoutes");
const producerRouter = require("./routes/producerRoutes");
const viewRouter = require("./routes/viewRoutes");
const userRouter = require("./routes/userRoutes");

const globalErrorHandler = require("./controllers/errorController");

const AppError = require("./utils/apiError");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.set(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use("/api/v1/actors", actorRouter);
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/producers", producerRouter);
app.use("/api/v1/users", userRouter);
app.use("/", viewRouter);

app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
