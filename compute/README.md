# Kairoo Compute Service

FastAPI service for non-LLM compute (embeddings, later: matching/analytics/parsing).
Deployed as a HuggingFace Docker Space. Schema is owned by the Next.js repo (Drizzle);
this service only reads/writes rows.

## Local run

pip install -r requirements.txt
PYTHONPATH=. uvicorn app.main:app --reload --port 7860

## Env

COMPUTE_SHARED_SECRET, DATABASE_URL, MODEL_NAME, ALLOWED_ORIGIN
