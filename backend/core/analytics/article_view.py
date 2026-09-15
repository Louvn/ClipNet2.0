from backend.models.analytics import Analytics
from backend.schematics.event_type import EventType
from backend.core.analytics.session_start import session_start_handler

def article_view_handler(db, user, article):
    active_session = session_start_handler(db, user)

    article_in_session = (
        db.query(Analytics)
        .filter(
            Analytics.session_id == active_session.id,
            Analytics.article_id == article.id,
            Analytics.event_type == EventType.article_view
        )
        .first()
    )
    if article_in_session:
        return

    event = Analytics(
        user_id = user.id,
        article_id = article.id,
        event_type = EventType.article_view,
        session_id = active_session.id
    )

    db.add(event)
    db.commit()