import express from 'express';
import cors from 'cors';
import jobsRouter from './routes/jobs.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

// ---------- Middleware (runs on every request, in this order) ----------
app.use(cors());           // allows the React frontend (another port) to call this API
app.use(express.json());   // reads JSON request bodies into req.body

// simple logger: prints e.g. "POST /api/jobs"
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// ---------- Routes ----------
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});
app.use('/api/jobs', jobsRouter);

// ---------- Error handling (must be LAST) ----------
app.use(notFound);       // no route matched -> 404
app.use(errorHandler);   // any error thrown above -> JSON error response

export default app;
