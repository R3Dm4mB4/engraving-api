class AppError extends Error {
  constructor(message, status = 500, details = null) {
    super(message)
    this.status = status
    this.details = details
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message, details = null) {
    super(message, 400, details)
  }
} 

export class NotFoundError extends AppError {
  constructor(message, details = null) {
    super(message, 404, details)
  }
}

export class UploadError extends AppError {
  constructor(message, details = null) {
    super(message, 500, details)
  }
}

export class AuthError extends AppError {
  constructor(message, details = null) {
    super(message, 401, details)
  }
}