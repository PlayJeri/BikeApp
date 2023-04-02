from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from fastapi_pagination import Page, paginate
from ..database import get_db
from ..models import Journey
from ..schemas import JourneyResponse


router = APIRouter(
    tags=['Journeys']
)


@router.get('/journeys', response_model=Page[JourneyResponse])
def get_journeys(limit: int = 10,
                 offset: int = 0,
                 db: Session = Depends(get_db)):

    journey_list = db.query(Journey).limit(limit).offset(offset).all()
    if not journey_list:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Journeys not found")

    return paginate(journey_list)


