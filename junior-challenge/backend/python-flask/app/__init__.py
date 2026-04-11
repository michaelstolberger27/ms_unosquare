import os
from flask import Flask
from flask_cors import CORS
from app.db import db


def create_app():
    app = Flask(__name__)

    # Database configuration — SQLite by default
    database_url = os.environ.get('DATABASE_URL')
    if database_url:
        app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    else:
        db_path = os.path.join(os.path.dirname(__file__), '..', 'instance', 'worldcup.db')
        os.makedirs(os.path.dirname(db_path), exist_ok=True)
        app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.abspath(db_path)}'

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialise extensions
    db.init_app(app)
    CORS(app, origins=['http://localhost:5173'])

    # Register blueprints
    from app.routes.cities import cities_bp
    from app.routes.matches import matches_bp
    from app.routes.itineraries import itineraries_bp
    from app.routes.optimise import optimise_bp

    app.register_blueprint(cities_bp, url_prefix='/api/cities')
    app.register_blueprint(matches_bp, url_prefix='/api/matches')
    app.register_blueprint(itineraries_bp, url_prefix='/api/itineraries')
    app.register_blueprint(optimise_bp, url_prefix='/api/route')

    # Health check
    @app.route('/api/health')
    def health():
        return {'status': 'ok'}

    return app


# Allow running with `flask run`
app = create_app()
