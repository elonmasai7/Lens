export function responseFormatter(req, res, next) {
  res.success = (data, meta = {}) => {
    res.json({
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        processingTime: Date.now() - req._startTime,
        ...meta,
      },
    })
  }
  req._startTime = Date.now()
  next()
}
