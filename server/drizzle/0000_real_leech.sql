CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"question" text NOT NULL,
	"status" varchar(20) DEFAULT 'pending',
	"answer" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
