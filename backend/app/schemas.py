from pydantic import BaseModel
from typing import List, Optional


class Station(BaseModel):
    station_id: int
    station_name_finnish: str
    station_name_swedish: str
    station_name_english: str
    address_finnish: str
    address_swedish: str
    city_finnish: Optional[str]
    city_swedish: Optional[str]
    operator: Optional[str] 
    capacity: int
    x_coordinate: float
    y_coordinate: float

class Top5Station(BaseModel):
    station_id: int
    station_name_finnish: str
    count: int

class StationResponse(Station):
    started_journeys_total: Optional[int]
    ended_journeys_total: Optional[int]
    started_journeys_avg_distance: Optional[int]
    ended_journeys_avg_distance: Optional[int]
    top5_return_stations: List[Top5Station]
    top5_departure_stations: List[Top5Station]

    class Config:
        orm_mode = True

class StationListResponse(BaseModel):
    station_id: int
    station_name_finnish: str

    class Config:
        orm_mode = True


class JourneyResponse(BaseModel):
    id: int
    departure_station_name: str
    return_station_name: str
    covered_distance: int
    duration: int 

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

class User(BaseModel):
    username: str

class UserCreate(BaseModel):
    username: str
    password: str

