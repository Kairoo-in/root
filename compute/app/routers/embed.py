from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel, Field
from ..auth import require_bearer

router = APIRouter(prefix="/v1", dependencies=[Depends(require_bearer)])


class EmbedRequest(BaseModel):
    texts: list[str] = Field(..., min_length=1, max_length=256)
    normalize: bool = True


class EmbedResponse(BaseModel):
    model: str
    dim: int
    vectors: list[list[float]]


@router.post("/embed", response_model=EmbedResponse)
def embed(req: EmbedRequest, request: Request) -> EmbedResponse:
    embedder = getattr(request.app.state, "embedder", None)
    if embedder is None:
        raise HTTPException(status_code=503, detail="model not loaded")
    vectors = embedder.encode(req.texts, normalize=req.normalize)
    return EmbedResponse(model=embedder.model_name, dim=embedder.dim, vectors=vectors)


class BackfillItem(BaseModel):
    entity_type: str
    entity_id: str
    text: str


class BackfillRequest(BaseModel):
    items: list[BackfillItem] = Field(..., min_length=1, max_length=512)


@router.post("/embed/backfill")
async def embed_backfill(req: BackfillRequest, request: Request) -> dict:
    from ..db import get_pool
    from ..jobs.backfill import upsert_embedding

    embedder = getattr(request.app.state, "embedder", None)
    if embedder is None:
        raise HTTPException(status_code=503, detail="model not loaded")
    pool = await get_pool()
    changed = 0
    for item in req.items:
        if await upsert_embedding(pool, item.entity_type, item.entity_id, item.text, embedder):
            changed += 1
    return {"processed": len(req.items), "changed": changed}
