from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import Journey
from ..schemas import JourneyResponse


router = APIRouter(
    tags=['Journeys']
)


@router.get('/journeys', response_model=List[JourneyResponse])
def get_journeys(db: Session = Depends(get_db)):

    journey_list = db.query(Journey).limit(10).all()
    if not journey_list:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Journeys not found")

    return journey_list

