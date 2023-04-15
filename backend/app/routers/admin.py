from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from ..database import get_db
from ..oauth import create_access_token, verify_password, get_current_user
from .. import models
from .. import schemas


router = APIRouter(
    tags=['Admin']
)


@router.post('/login', response_model=schemas.Token)
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):

    user = db.query(models.User).filter(models.User.username == user_credentials.username).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid credentials"
        )
    if not verify_password(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid credentials"
        )
    
    access_token = create_access_token(data={"username": user.username})

    return {"access_token": access_token, "token_type": "bearer"}


@router.post('/station')
def add_station(station_schema: schemas.Station ,db: Session = Depends(get_db), current_user = Depends(get_current_user)):

    new_station = models.Station(**station_schema.dict())

    db.add(new_station)
    db.commit()
    db.refresh(new_station)

    return new_station
