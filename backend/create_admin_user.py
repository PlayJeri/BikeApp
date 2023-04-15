from app.database import SessionLocal, engine, Base
from fastapi import Depends
from app.models import User
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_admin_user():
    db = SessionLocal()
    username = input("Username: ")
    password = input("Password: ")
    password2 = input("Retype password: ")

    if password == password2:
        hashed_password = pwd_context.hash(password)

    new_user = User(
        username = username,
        password = hashed_password
)
    db.add(new_user)
    db.commit()


if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    create_admin_user()
    