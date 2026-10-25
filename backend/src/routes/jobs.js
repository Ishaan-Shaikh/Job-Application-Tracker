import { Router } from 'express';
import { getJobs, getJob, createJob, updateJob, deleteJob } from '../controllers/jobsController.js';
import { validateJob } from '../middleware/validateJob.js';

const router = Router();

router.get('/', getJobs);                        // READ all   (optional ?status=)
router.get('/:id', getJob);                      // READ one
router.post('/', validateJob, createJob);        // CREATE
router.put('/:id', validateJob, updateJob);      // UPDATE
router.delete('/:id', deleteJob);                // DELETE

export default router;
