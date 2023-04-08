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
        "station_name_finnish": "b_test_station_2",
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
        "station_name_finnish": "j_test_station_3_best",
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
        "station_name_finnish": "x_test_station_4_best",
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
        "station_name_finnish": "a_test_station_5",
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

@pytest.fixture
def test_journeys(session):
    journeys_data = [{
        "departure_time": "2023-04-08 10:00:00",
        "return_time": "2023-04-08 11:00:00",
        "departure_station_id": 21,
        "departure_station_name": "test_station_1",
        "return_station_id": 24,
        "return_station_name": "b_test_station_2",
        "covered_distance": 5000,
        "duration": 3600
    }, {
        "departure_time": "2023-04-08 12:00:00",
        "return_time": "2023-04-08 13:00:00",
        "departure_station_id": 21,
        "departure_station_name": "b_test_station_2",
        "return_station_id": 21,
        "return_station_name": "j_test_station_3",
        "covered_distance": 3000,
        "duration": 3600
    }, {
        "departure_time": "2023-04-08 14:00:00",
        "return_time": "2023-04-08 15:00:00",
        "departure_station_id": 31,
        "departure_station_name": "j_test_station_3",
        "return_station_id": 21,
        "return_station_name": "x_test_station_4",
        "covered_distance": 10000,
        "duration": 3600
    }, {
        "departure_time": "2023-04-08 16:00:00",
        "return_time": "2023-04-08 17:00:00",
        "departure_station_id": 21,
        "departure_station_name": "x_test_station_4",
        "return_station_id": 52,
        "return_station_name": "a_test_station_5",
        "covered_distance": 8000,
        "duration": 3600
    }, {
        "departure_time": "2023-04-08 18:00:00",
        "return_time": "2023-04-08 19:00:00",
        "departure_station_id": 52,
        "departure_station_name": "a_test_station_5",
        "return_station_id": 21,
        "return_station_name": "test_station_1",
        "covered_distance": 6000,
        "duration": 3600
    }]
    journeys = []
    for journey_data in journeys_data:
        journey = models.Journey(**journey_data)
        journeys.append(journey)
        session.add(journey)
    session.commit()
    return journeys
