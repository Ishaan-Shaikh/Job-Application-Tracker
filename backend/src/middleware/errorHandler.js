// A custom error that carries an HTTP status code (404, 400, ...)
export class HttpError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;   // optional extra info, e.g. list of invalid fields
  }
}

// Runs when no route matched the request
export function notFound(req, res, next) {
  next(new HttpError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

// Central error handler: every error ends up here and becomes a JSON response.
// Express knows this is an error handler because it has 4 parameters.
export function errorHandler(err, req, res, next) {
  // express.json() throws this when the body is not valid JSON
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON in request body' });
  }

  const status = err.status || 500;
  if (status === 500) console.error(err);   // log unexpected errors for the developer

  const body = { error: status === 500 ? 'Internal server error' : err.message };
  if (err.details) body.details = err.details;

  res.status(status).json(body);
}
