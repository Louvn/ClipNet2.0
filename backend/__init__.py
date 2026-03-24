# -- Env --
from dotenv import load_dotenv
load_dotenv()

# -- API --
from fastapi import FastAPI

app = FastAPI(
    title="ClipNet API",
    description="ClipNet is a modern Wiki System built with FastAPI",
    version="1.0.0",
    root_path="/api"
)

from .routes.auth import router as auth_router
from .routes.articles import router as articles_router


app.include_router(auth_router)
app.include_router(articles_router)

# -- Create db -- 
from .database import Base, engine
from . import models

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)