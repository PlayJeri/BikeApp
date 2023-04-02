from fastapi import FastAPI
from fastapi_pagination import add_pagination
from .routers import journeys, stations

app = FastAPI()

app.include_router(journeys.router)
app.include_router(stations.router)

add_pagination(app)
