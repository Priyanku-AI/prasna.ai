Praśna.AI is a full-stack application where users submit a **website URL and a question**.  
The system scrapes the website, processes the data through an **AI model** in a background job, and returns the final answer once completed.

---

## 🔧 Tech Used

**Frontend**
- Next.js (App Router)
- React Query
- Tailwind CSS
- TypeScript

**Backend**
- Express.js
- BullMQ (background jobs)
- Drizzle ORM
- PostgreSQL

**Worker**
- Playwright (scraping)
- AI API (for generating the answer)
