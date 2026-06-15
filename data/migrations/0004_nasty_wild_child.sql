CREATE TABLE "usage_budgets" (
	"day" text NOT NULL,
	"scope" text DEFAULT 'global' NOT NULL,
	"req_count" integer DEFAULT 0 NOT NULL,
	"token_estimate" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "usage_budgets_day_scope_pk" PRIMARY KEY("day","scope")
);
