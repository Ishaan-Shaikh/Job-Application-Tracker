import { HttpError } from './errorHandler.js';

export const STATUSES = ['applied', 'interview', 'offer', 'rejected'];

// Checks the request body BEFORE it reaches the controller.
// If everything is valid, it replaces req.body with a cleaned version
// (trimmed text, defaults filled in) and calls next().
export function validateJob(req, res, next) {
  const body = req.body ?? {};

  if (typeof body !== 'object' || Array.isArray(body)) {
    return next(new HttpError(400, 'Request body must be a JSON object'));
  }

  const errors = [];

  // required text fields
  function requiredText(field, max) {
    const value = typeof body[field] === 'string' ? body[field].trim() : '';
    if (!value) errors.push({ field, message: `${field} is required` });
    else if (value.length > max) errors.push({ field, message: `${field} must be at most ${max} characters` });
    return value;
  }

  // optional text fields
  function optionalText(field, max) {
    if (body[field] === undefined || body[field] === null) return '';
    if (typeof body[field] !== 'string') {
      errors.push({ field, message: `${field} must be a string` });
      return '';
    }
    const value = body[field].trim();
    if (value.length > max) errors.push({ field, message: `${field} must be at most ${max} characters` });
    return value;
  }

  const title = requiredText('title', 100);
  const company = requiredText('company', 100);
  const location = optionalText('location', 100);
  const notes = optionalText('notes', 500);

  // status must be one of the allowed values (default: applied)
  const status = body.status ?? 'applied';
  if (!STATUSES.includes(status)) {
    errors.push({ field: 'status', message: `status must be one of: ${STATUSES.join(', ')}` });
  }

  // date must look like YYYY-MM-DD and be a real calendar date (default: today)
  let date = body.date;
  if (date === undefined || date === null || date === '') {
    date = new Date().toISOString().split('T')[0];
  } else {
    const parsed = new Date(date);
    const isValid = typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)
      && !isNaN(parsed) && parsed.toISOString().slice(0, 10) === date;
    if (!isValid) errors.push({ field: 'date', message: 'date must be a valid date in YYYY-MM-DD format' });
  }

  if (errors.length > 0) {
    return next(new HttpError(400, 'Validation failed', errors));
  }

  req.body = { title, company, status, location, date, notes };
  next();
}
