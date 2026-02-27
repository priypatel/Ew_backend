const errorHandler = (err, req, res, next) => {
  console.error("ERROR:", err);

  let statusCode =
    err.statusCode && Number.isInteger(err.statusCode) ? err.statusCode : 500;
  let message = err.message || "Internal Server Error";

  res.status(statusCode).json({ success: false, message });
};
export default errorHandler;
