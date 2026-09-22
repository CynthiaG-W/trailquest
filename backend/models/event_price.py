from extensions import db


class EventPrice(db.Model):
    __tablename__ = "event_prices"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    event_id = db.Column(
        db.Integer,
        db.ForeignKey("events.id"),
        nullable=False
    )

    category = db.Column(
        db.String(100),
        nullable=False
    )

    option = db.Column(
        db.String(100),
        nullable=False
    )

    currency = db.Column(
        db.String(10),
        nullable=False,
        default="KES"
    )

    amount = db.Column(
        db.Numeric(10, 2),
        nullable=False
    )

    event = db.relationship(
        "Event",
        backref=db.backref(
            "prices",
            lazy=True,
            cascade="all, delete-orphan"
        )
    )