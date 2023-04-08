from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import pytest

from app.main import app
from app import models
from app.database import get_db, Base

from dotenv import load_dotenv
import os
load_dotenv()


TEST_DATABASE_URI = os.getenv('TEST_DATABASE_URI')

engine = create_engine(TEST_DATABASE_URI)

TestingSessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine
)



@pytest.fixture()
def session():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture()
def client(session):
    def override_get_db():
        try:
            yield session
        finally:
            session.close()
    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)

@pytest.fixture()
def test_stations(session):
    stations_data = [{
        "station_id": 21,
        "station_name_finnish": "test_station_1",
        "station_name_swedish": "test_station_1",
        "station_name_english": "test_station_1",
        "address_finnish": "test_address_1",
        "address_swedish": "test_address_1",
        "city_finnish": "",
        "city_swedish": "",
        "operator": "",
        "capacity": 30,
        "x_coordinate": 23.2,
        "y_coordinate": 12.54
    }, {
        "station_id": 24,
        "station_name_finnish": "test_station_2",
        "station_name_swedish": "test_station_2",
        "station_name_english": "test_station_2",
        "address_finnish": "test_address_2",
        "address_swedish": "test_address_2",
        "city_finnish": "",
        "city_swedish": "",
        "operator": "",
        "capacity": 20,
        "x_coordinate": 23.2,
        "y_coordinate": 12.54
    }, {
        "station_id": 31,
        "station_name_finnish": "test_station_3",
        "station_name_swedish": "test_station_3",
        "station_name_english": "test_station_3",
        "address_finnish": "test_address_3",
        "address_swedish": "test_address_3",
        "city_finnish": "",
        "city_swedish": "",
        "operator": "",
        "capacity": 50,
        "x_coordinate": 23.2,
        "y_coordinate": 12.524
    }, {
        "station_id": 27,
        "station_name_finnish": "test_station_4",
        "station_name_swedish": "test_station_4",
        "station_name_english": "test_station_4",
        "address_finnish": "test_address_4",
        "address_swedish": "test_address_4",
        "city_finnish": "",
        "city_swedish": "",
        "operator": "",
        "capacity": 22,
        "x_coordinate": 23.212,
        "y_coordinate": 12.454
    }, {
        "station_id": 52,
        "station_name_finnish": "test_station_5",
        "station_name_swedish": "test_station_5",
        "station_name_english": "test_station_5",
        "address_finnish": "test_address_5",
        "address_swedish": "test_address_5",
        "city_finnish": "",
        "city_swedish": "",
        "operator": "",
        "capacity": 32,
        "x_coordinate": 23.223,
        "y_coordinate": 12.554
    }]

    def create_station_model(station):
        return models.Station(**station)
    
    station_map = map(create_station_model, stations_data)
    stations = list(station_map)

    session.add_all(stations)
    session.commit()

    stations = session.query(models.Station).all()
    return stations