export function errorHandler(err, _req, res, _next) {
  console.error('Error:', err.message)
  res.status(err.status || 500).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message || 'An unexpected error occurred',
    },
    meta: {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    },
  })
}

export function createError(status, code, message) {
  const err = new Error(message)
  err.status = status
  err.code = code
  return err
}
