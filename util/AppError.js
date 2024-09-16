const AppError = (message, statusCode) => {
  const error = new Error(message);

  error.statusCode = error.statusCode || 500;
  error.status = error.statusCode.startsWith("4") ? "Not found" : "error";

  

  return error;
};
