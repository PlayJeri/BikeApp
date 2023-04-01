from fastapi import APIRouter, HTTPException, Depends
from database import get_db
from sqlalchemy.orm import Session
from models import Journey
from schemas import JourneyResponse
from typing import List


router = APIRouter(
    tags=['Journeys']
)


@router.get('/journeys', response_model=List[JourneyResponse])
def get_journeys(db: Session = Depends(get_db)):

    journey_list = db.query(Journey).limit(10).all()

    return journey_list

