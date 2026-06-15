import pytest
from fastapi import HTTPException
from app.auth import require_bearer


def test_wrong_token_raises_401():
    with pytest.raises(HTTPException) as exc:
        require_bearer(authorization="Bearer wrong-token")
    assert exc.value.status_code == 401


def test_empty_auth_raises_401():
    with pytest.raises(HTTPException):
        require_bearer(authorization="")


def test_correct_token_passes():
    # Default secret is "dev-secret-change-me"
    require_bearer(authorization="Bearer dev-secret-change-me")
