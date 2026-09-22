from flask import Flask
from flask_cors import CORS

from config import Config
from extensions import db, migrate
from routes.events import events_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    CORS(app)
    
    from models.event_price import EventPrice

    app.register_blueprint(events_bp)

    @app.route("/")
    def home():
        return {
            "message": "Welcome to the TrailQuest API"
        }

    @app.route("/api/test-db")
    def test_db():
        try:
            with db.engine.connect() as connection:
                connection.execute(db.text("SELECT 1"))

            return {
                "status": "success",
                "message": "TrailQuest is connected to PostgreSQL"
            }

        except Exception as error:
            return {
                "status": "error",
                "message": str(error)
            }, 500

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)