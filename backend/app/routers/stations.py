from fastapi import APIRouter, HTTPException, Depends, status
from fastapi_pagination import Page, paginate
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from typing import List
from ..models import Station, Journey
from ..schemas import StationResponse, StationListResponse
from ..database import get_db


router = APIRouter(
    tags=['Stations']
)


@router.get('/station/{id}', response_model=StationResponse)
def get_station(id: int, db: Session = Depends(get_db)):

    station = db.query(Station).filter(Station.station_id==id).first()
    if not station:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Station id {id} not found")
    
    try:
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
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Internal server error") from e
    
    station.started_journeys_total = started_journeys_total
    station.ended_journeys_total = ended_journeys_total
    station.top5_return_stations = [dict(zip(['station_id', 'station_name_finnish', 'count'], station)) for station in top5_return_stations]
    station.top5_departure_stations = [dict(zip(['station_id', 'station_name_finnish', 'count'], station)) for station in top5_departure_station]

    return station


@router.get('/stations', response_model=Page[StationListResponse])
def get_stations(db: Session = Depends(get_db)):
    
    stations = db.query(Station).order_by(Station.station_name_finnish).all()

    if not stations:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    return paginate(stations)


@router.get('/stations/search', response_model=List[StationListResponse])
def search_stations(db: Session = Depends(get_db),
                    station_name: str = ""):
    
    stations = db.query(Station).filter(Station.station_name_finnish.ilike(f'%{station_name}%')).limit(3).all()

    return stations
