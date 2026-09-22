from datetime import datetime

from extensions import db


class Event(db.Model):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(200), nullable=False)
    organiser = db.Column(db.String(200), nullable=False)

    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.String(50))

    location = db.Column(db.String(200), nullable=False)

    difficulty = db.Column(db.String(50), nullable=False)
    distance = db.Column(db.String(50))


    description = db.Column(db.Text)

    registration_url = db.Column(db.Text)
    source_url = db.Column(db.Text)

    verification_status = db.Column(
        db.String(50),
        default="Needs verification"
    )

    last_verified = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )