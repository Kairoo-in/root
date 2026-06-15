from fastapi import APIRouter, Request

router = APIRouter()


@router.get("/health")
def health(request: Request) -> dict:
    return {
        "status": "ok",
        "model_loaded": bool(getattr(request.app.state, "embedder", None)),
    }
