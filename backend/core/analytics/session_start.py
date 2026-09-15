from backend.models.analytics import Analytics
from backend.schematics.event_type import EventType
from backend.utils.db_lock import db_lock
from datetime import datetime, timedelta, timezone

def session_start_handler(db, user):
    db_lock(db, user)

    last_session = (
        db.query(Analytics)
        .filter(
            Analytics.user_id == user.id,
            Analytics.event_type == EventType.session_start
        )
        .order_by(Analytics.created_at.desc())
        .first()
    )

    if not (last_session is None or datetime.now(timezone.utc) - last_session.created_at > timedelta(minutes=30)):
        return last_session


    event = Analytics(
        user_id = user.id,
        event_type = EventType.session_start
    )

    db.add(event)
    db.flush()

    event.session_id = event.id

    db.commit()

    return event