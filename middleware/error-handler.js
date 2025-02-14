const { serializeError } = require('serialize-error-cjs')
const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }  
  err = serializeError(err);
  if(err.name === "ValidationError") {
    const message = err.message;
    return res.status(StatusCodes.BAD_REQUEST).json({ success : false,message })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

module.exports = errorHandlerMiddleware
