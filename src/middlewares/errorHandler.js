export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Internal Server Error'

  const errorResponse = {
    status,
    message,
    ...(err.details && { details: err.details })
  }
  console.error(`[ERROR]: ${message}`, {
    status,
    details: err.details
  })
  res.status(status).json(errorResponse)
}