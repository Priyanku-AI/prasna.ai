Praśna.AI is a full-stack application where users submit a **website URL and a question**.  
The system scrapes the website, processes the data through an **AI model** in a background job, and returns the final answer once completed.

---

## Tech Stack

### Frontend
Built with a modern, responsive, and scalable UI stack:

- **Next.js (App Router)** – Routing, server components, and rendering
- **React Query (TanStack Query)** – Data fetching, caching, background updates
- **Tailwind CSS** – Utility-first styling for rapid UI development
- **TypeScript** – Type-safe, maintainable codebase

---

###  Backend
Handles API requests, queues jobs, and persists data:

- **Express.js** – Lightweight REST API server
- **BullMQ** – Redis-backed job queue for asynchronous processing
- **Redis** – Job storage and state tracking
- **Drizzle ORM** – Type-safe queries and schema migrations
- **PostgreSQL** – Primary database storing tasks, statuses, and AI outputs

---

###  Worker Process
A dedicated background worker responsible for heavy workloads:

- **BullMQ Worker** – Listens to the Redis queue and processes jobs
- **Playwright** – Headless browser scraping for extracting website content
- **AI API (Free Model)** – Generates AI answers based on scraped data + user question
- **Drizzle ORM** – Saves final job results to PostgreSQL

Runs independently from the API server to keep the system fast, scalable, and non-blocking.
