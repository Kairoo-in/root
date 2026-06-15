import hmac
from fastapi import Header, HTTPException, status
from .config import settings


def require_bearer(authorization: str = Header(default="")) -> None:
    """Fail-closed Bearer shared-secret check for all /v1/* routes."""
    prefix = "Bearer "
    token = authorization[len(prefix):] if authorization.startswith(prefix) else ""
    if not token or not hmac.compare_digest(token, settings.compute_shared_secret):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="invalid token")
