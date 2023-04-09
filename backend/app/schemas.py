from pydantic import BaseModel
from typing import List


class Top5Station(BaseModel):
    station_id: int
    station_name_finnish: str
    count: int

class JourneyResponse(BaseModel):
    id: int
    departure_station_name: str
    return_station_name: str
    covered_distance: int
    duration: int 

    class Config:
        orm_mode = True

class StationResponse(BaseModel):
    station_id: int
    station_name_finnish: str
    station_name_swedish: str
    station_name_english: str
    address_finnish: str
    address_swedish: str
    city_finnish: str
    city_swedish: str
    operator: str 
    capacity: int
    x_coordinate: float
    y_coordinate: float
    started_journeys_total: int
    ended_journeys_total: int
    started_journeys_avg_distance: int
    ended_journeys_avg_distance: int
    top5_return_stations: List[Top5Station]
    top5_departure_stations: List[Top5Station]

    class Config:
        orm_mode = True

class StationListResponse(BaseModel):
    station_id: int
    station_name_finnish: str

    class Config:
        orm_mode = True
