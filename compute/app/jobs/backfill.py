from __future__ import annotations
import hashlib


def content_hash(text: str) -> str:
    """Stable hash used to skip re-embedding unchanged content."""
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


async def upsert_embedding(pool, entity_type: str, entity_id: str, text: str, embedder) -> bool:
    """Embed + upsert one entity. Returns True if (re)embedded, False if unchanged."""
    h = content_hash(text)
    async with pool.acquire() as conn:
        existing = await conn.fetchval(
            "SELECT content_hash FROM embeddings WHERE entity_type=$1 AND entity_id=$2",
            entity_type, entity_id,
        )
        if existing == h:
            return False
        vector = embedder.encode([text])[0]
        vec_literal = "[" + ",".join(str(x) for x in vector) + "]"
        await conn.execute(
            """
            INSERT INTO embeddings (entity_type, entity_id, content_hash, embedding, model, updated_at)
            VALUES ($1, $2, $3, $4::vector, $5, now())
            ON CONFLICT (entity_type, entity_id) DO UPDATE SET
              content_hash = EXCLUDED.content_hash,
              embedding = EXCLUDED.embedding,
              model = EXCLUDED.model,
              updated_at = now()
            """,
            entity_type, entity_id, h, vec_literal, embedder.model_name,
        )
        return True
