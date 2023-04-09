from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import Optional
from fastapi_pagination import Page, paginate
from ..database import get_db
from ..models import Journey
from ..schemas import JourneyResponse


router = APIRouter(
    tags=['Journeys']
)


@router.get('/journeys', response_model=Page[JourneyResponse])
def get_journeys(limit: int = 300,
                 sort_by: Optional[str] = None,
                 order: Optional[str] = None,
                 page: int = 1,
                 offset: int = 0,
                 db: Session = Depends(get_db)):
    

    if sort_by == 'null' or order == 'null':
        sort_by = None
        order = None

    query = db.query(Journey)

    if sort_by:
        if order == 'asc':
            query = query.order_by(sort_by)
        else:
            query = query.order_by(desc(sort_by))

    journey_list = query.limit(limit).offset(offset).all()

    if not journey_list:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="No journeys found")

    return paginate(journey_list)
