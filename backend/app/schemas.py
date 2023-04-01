from pydantic import BaseModel


class JourneyResponse(BaseModel):
    departure_station: str
    return_station: str
    distance: int
    duration: int    
