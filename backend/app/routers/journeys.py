from fastapi import APIRouter, HTTPException, Depends
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

    return journey_list
