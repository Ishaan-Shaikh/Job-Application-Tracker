# Job Tracker API

REST API for the Job Application Tracker, built with **Node.js + Express**.
Supports CRUD, request validation, centralized error handling, and is tested with Postman.

## Run
```
npm install
npm start          # http://localhost:3000
npm run dev        # same, but restarts when files change
```
Needs Node 18+. Data is saved in `data/jobs.json` (created on first run with 4 sample jobs).

## Endpoints

| Method | URL | Description | Success |
|---|---|---|---|
| GET | `/api/health` | Check the API is running | 200 |
| GET | `/api/jobs` | List all jobs (optional `?status=applied`) | 200 |
| GET | `/api/jobs/:id` | Get one job | 200 |
| POST | `/api/jobs` | Create a job | 201 |
| PUT | `/api/jobs/:id` | Replace a job's data | 200 |
| DELETE | `/api/jobs/:id` | Delete a job | 204 |

### Job fields
| Field | Rules |
|---|---|
| `title` | required, text, max 100 |
| `company` | required, text, max 100 |
| `status` | `applied` / `interview` / `offer` / `rejected` (default `applied`) |
| `location` | optional, text, max 100 |
| `date` | optional, `YYYY-MM-DD` and a real date (default today) |
| `notes` | optional, text, max 500 |

### Error responses
```json
{ "error": "Validation failed",
  "details": [ { "field": "title", "message": "title is required" } ] }
```
| Status | When |
|---|---|
| 400 | invalid body, invalid JSON, invalid `?status=` |
| 404 | job id not found, or unknown route |
| 500 | unexpected server error |

## Test with Postman
1. Start the API (`npm start`).
2. Postman -> **Import** -> `postman/JobTracker.postman_collection.json`.
3. Right-click the collection -> **Run collection** -> **Run**.
   (Run in order: "Create" saves `{{jobId}}` for the requests after it.)

## Project structure
```
server.js                           starts the server
src/app.js                          middleware + routes + error handlers
src/routes/jobs.js                  URL -> controller function
src/controllers/jobsController.js   CRUD logic
src/middleware/validateJob.js       request validation
src/middleware/errorHandler.js      404 + error responses
src/store.js                        reads/writes data/jobs.json
postman/                            exported Postman collection
```
