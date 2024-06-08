import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import { AppError } from "../errors/AppError";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message: string = "Something went wrong";
  let errorMessage: string = "";
  let errorDetails;

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = "There was an App error";
    errorMessage = error.message;
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorMessage,
    errorDetails,
    stack: message === "Unauthorized Access" ? null : error.stack,
  });
};

export default globalErrorHandler;
