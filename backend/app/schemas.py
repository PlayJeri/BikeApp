from pydantic import BaseModel


class JourneyResponse(BaseModel):
    departure_station_name: str
    return_station_name: str
    covered_distance: int
    duration: int 

    class Config:
        orm_mode = True
