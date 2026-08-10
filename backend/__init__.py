# -- Env --
from dotenv import load_dotenv
import os
load_dotenv()

# -- API --
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="ClipNet API",
    description=f"ClipNet is a modern Wiki System built with FastAPI. <a href='{os.getenv("FRONTEND_URL")}'>Go to ClipNet Web</a>",
    version=os.getenv("REACT_APP_WIKI_VERSION"),
    root_path="/api"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from .routes.auth import router as auth_router
from .routes.articles import router as articles_router
from .routes.search import router as search_router
from .routes.statistics import router as stats_router
from .routes.users import router as users_router
from .routes.social import router as social_router
from .routes.announcements import router as announcements_router
from .routes.moderation import router as moderation_router

app.include_router(auth_router)
app.include_router(articles_router)
app.include_router(search_router)
app.include_router(stats_router)
app.include_router(users_router)
app.include_router(social_router)
app.include_router(announcements_router)
app.include_router(moderation_router)

# -- Create db -- 
from .database import Base, engine, get_db
from . import models
from backend.utils.create_default_admin import create_default_admin

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

    db = next(get_db())
    create_default_admin(db)
    db.close()