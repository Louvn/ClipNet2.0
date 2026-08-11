from fastapi import Depends
from backend.core.security.jwt_helpers import get_current_admin
from backend.database import get_db
from backend.models import Report

def get_pending_reports(user = Depends(get_current_admin), db = Depends(get_db)):

    return db.query(Report).filter(Report.pending.is_(True)).all()