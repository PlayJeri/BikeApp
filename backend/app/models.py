from sqlalchemy import Column, String, Float, Integer, TIMESTAMP, UniqueConstraint

from .database import Base

class Station(Base):
    __tablename__ = "stations"

    id = Column(Integer, primary_key=True, nullable=False)
    station_id = Column(Integer, unique=True)
    station_name_finnish = Column(String)
    station_name_swedish = Column(String)
    station_name_english = Column(String)
    address_finnish = Column(String)
    address_swedish = Column(String)
    city_finnish = Column(String, nullable=True)
    city_swedish = Column(String, nullable=True)
    operator = Column(String, nullable=True)
    capacity = Column(Integer)
    x_coordinate = Column(Float)
    y_coordinate = Column(Float)

class Journey(Base):
    __tablename__ = "journeys"

    id = Column(Integer, primary_key=True, nullable=False)
    departure_time = Column(TIMESTAMP)
    return_time = Column(TIMESTAMP)
    departure_station_id = Column(Integer)
    departure_station_name = Column(String)
    return_station_id = Column(Integer)
    return_station_name = Column(String)
    covered_distance = Column(Integer)
    duration = Column(Integer)

    __table_args__ = (
        UniqueConstraint('departure_time', 'departure_station_id', 'return_time', 'return_station_id'),
    )

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
