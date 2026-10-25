import { randomUUID } from 'node:crypto';
import { readJobs, writeJobs } from '../store.js';
import { HttpError } from '../middleware/errorHandler.js';
import { STATUSES } from '../middleware/validateJob.js';

// Express 5 automatically forwards errors thrown inside async functions
// to the error handler, so no try/catch is needed here.

// GET /api/jobs  (optional filter: /api/jobs?status=applied)
export async function getJobs(req, res) {
  let jobs = await readJobs();

  const { status } = req.query;
  if (status) {
    if (!STATUSES.includes(status)) {
      throw new HttpError(400, `status filter must be one of: ${STATUSES.join(', ')}`);
    }
    jobs = jobs.filter(job => job.status === status);
  }

  res.json(jobs);
}

// GET /api/jobs/:id
export async function getJob(req, res) {
  const jobs = await readJobs();
  const job = jobs.find(j => j.id === req.params.id);
  if (!job) throw new HttpError(404, `Job with id '${req.params.id}' not found`);

  res.json(job);
}

// POST /api/jobs   (body already validated by validateJob)
export async function createJob(req, res) {
  const jobs = await readJobs();
  const job = { id: randomUUID(), ...req.body };

  jobs.push(job);
  await writeJobs(jobs);

  res.status(201).location(`/api/jobs/${job.id}`).json(job);
}

// PUT /api/jobs/:id   (replaces the job's data, keeps its id)
export async function updateJob(req, res) {
  const jobs = await readJobs();
  const index = jobs.findIndex(j => j.id === req.params.id);
  if (index === -1) throw new HttpError(404, `Job with id '${req.params.id}' not found`);

  jobs[index] = { id: jobs[index].id, ...req.body };
  await writeJobs(jobs);

  res.json(jobs[index]);
}

// DELETE /api/jobs/:id
export async function deleteJob(req, res) {
  const jobs = await readJobs();
  const index = jobs.findIndex(j => j.id === req.params.id);
  if (index === -1) throw new HttpError(404, `Job with id '${req.params.id}' not found`);

  jobs.splice(index, 1);
  await writeJobs(jobs);

  res.status(204).end();   // 204 = success, nothing to send back
}
