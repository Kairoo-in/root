from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    compute_shared_secret: str = "dev-secret-change-me"
    database_url: str = ""
    model_name: str = "BAAI/bge-small-en-v1.5"
    allowed_origin: str = "*"

    class Config:
        env_file = ".env"


settings = Settings()
