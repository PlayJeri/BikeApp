from fastapi import APIRouter, HTTPException, Depends
from database import get_db
from sqlalchemy.orm import Session
from models import Station, Journey
from schemas import StationResponse
from typing import List
from sqlalchemy import func, desc


router = APIRouter(
    tags=['Stations']
)


@router.get('/station/{id}', status_code=200, response_model=StationResponse)
def get_station(id: int, db: Session = Depends(get_db)):

    station = db.query(Station).filter(Station.station_id==id).first()
    started_journeys_total = db.query(Journey).filter(Journey.departure_station_id==id).count()
    ended_journeys_total = db.query(Journey).filter(Journey.return_station_id==id).count()
    top5_return_stations = (
        db.query(
            Journey.return_station_id,
            Station.station_name_finnish,
            func.count(Journey.return_station_id).label('count')
        )
        .join(Station, Journey.return_station_id == Station.id)
        .filter(Journey.departure_station_id == id)
        .group_by(Journey.return_station_id, Station.station_name_finnish)
        .order_by(desc('count'))
        .limit(5)
        .all()
    )
    top5_departure_station = (
        db.query(
            Journey.departure_station_id,
            Station.station_name_finnish,
            func.count(Journey.departure_station_id).label('count')
        )
        .join(Station, Journey.departure_station_id == Station.id)
        .filter(Journey.return_station_id == id)
        .group_by(Journey.departure_station_id, Station.station_name_finnish)
        .order_by(desc('count'))
        .limit(5)
        .all()
    )
    
    station.started_journeys_total = started_journeys_total
    station.ended_journeys_total = ended_journeys_total
    station.top5_return_stations = [dict(zip(['station_id', 'station_name_finnish', 'count'], station)) for station in top5_return_stations]
    station.top5_departure_stations = [dict(zip(['station_id', 'station_name_finnish', 'count'], station)) for station in top5_departure_station]

    return station
