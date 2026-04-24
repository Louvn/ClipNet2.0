# -- Env --
from dotenv import load_dotenv
load_dotenv()

# -- API --
from fastapi import FastAPI

app = FastAPI(
    title="ClipNet API",
    description="ClipNet is a modern Wiki System built with FastAPI. <a href='/'>Go to ClipNet Web</a>",
    version="1.0.0",
    root_path="/api"
)

from .routes.auth import router as auth_router
from .routes.articles import router as articles_router
from .routes.search import router as search_router
from .routes.statistics import router as stats_router

app.include_router(auth_router)
app.include_router(articles_router)
app.include_router(search_router)
app.include_router(stats_router)

# -- Create db -- 
from .database import Base, engine
from . import models

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)