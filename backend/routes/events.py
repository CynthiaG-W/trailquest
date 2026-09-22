from datetime import date

from flask import Blueprint, jsonify

from models.event import Event


events_bp = Blueprint(
    "events",
    __name__,
    url_prefix="/api/events"
)


def event_to_dict(event):
    return {
        "id": event.id,
        "name": event.name,
        "organiser": event.organiser,
        "date": event.date.isoformat(),
        "time": event.time,
        "location": event.location,
        "difficulty": event.difficulty,
        "distance": event.distance,
        "description": event.description,
        "registrationUrl": event.registration_url,
        "sourceUrl": event.source_url,
        "verificationStatus": event.verification_status,
        "lastVerified": (
            event.last_verified.isoformat()
            if event.last_verified
            else None
        ),
        "prices": [
            {
                "id": price.id,
                "category": price.category,
                "option": price.option,
                "currency": price.currency,
                "amount": float(price.amount),
            }
            for price in event.prices
        ],
    }


@events_bp.route("/", methods=["GET"])
def get_events():
    events = (
        Event.query
        .filter(Event.date >= date.today())
        .order_by(Event.date.asc())
        .all()
    )

    return jsonify([
        event_to_dict(event)
        for event in events
    ])


@events_bp.route("/<int:event_id>", methods=["GET"])
def get_event(event_id):
    event = Event.query.get(event_id)

    if not event:
        return jsonify({
            "error": "Event not found"
        }), 404

    return jsonify(event_to_dict(event))