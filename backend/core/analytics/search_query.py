from backend.models.analytics import Analytics
from backend.schematics.event_type import EventType
from backend.core.analytics.session_start import session_start_handler

def search_query_handler(db, user, query):
    active_session = session_start_handler(db, user)

    query_in_session = (
        db.query(Analytics)
        .filter(
            Analytics.session_id == active_session.id,
            Analytics.text == query,
            Analytics.event_type == EventType.search_query
        )
        .first()
    )
    if query_in_session or not query:
        return

    event = Analytics(
        user_id = user.id,
        text = query,
        event_type = EventType.search_query,
        session_id = active_session.id
    )

    db.add(event)
    db.commit()