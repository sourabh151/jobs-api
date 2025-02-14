require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const mongoose =  require('mongoose');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//Authorization
const authenticate = require("./middleware/authentication")

//router
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

app.use(express.json());
// extra packages

// routes
app.use("/",express.static("./frontend/"));
app.use("/api/v1/auth/",authRouter);
app.use("/api/v1/jobs/",authenticate,jobsRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
