CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE "embeddings" (
	"entity_type" text NOT NULL,
	"entity_id" text NOT NULL,
	"content_hash" text NOT NULL,
	"embedding" vector(384),
	"model" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "embeddings_entity_type_entity_id_pk" PRIMARY KEY("entity_type","entity_id")
);

CREATE INDEX IF NOT EXISTS embeddings_vec_hnsw
  ON embeddings USING hnsw (embedding vector_cosine_ops);
