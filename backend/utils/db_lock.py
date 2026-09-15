from sqlalchemy import text

def db_lock(db, user):

    db.execute(
        text("SELECT pg_advisory_xact_lock(:user_id)"),
        {"user_id": user.id}
    )