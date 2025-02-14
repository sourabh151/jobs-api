require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//Authorization
const authenticate = require("./middleware/authentication")

//router
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

//middleware
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss");
const { rateLimit } = require("express-rate-limit")

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below. 
})

app.use(express.json());
// extra packages
app.use(limiter());
app.use(cors());
app.use(helmet());
app.use(xss());

// routes
app.use("/", express.static("./frontend/"));
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/jobs/", authenticate, jobsRouter);


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
