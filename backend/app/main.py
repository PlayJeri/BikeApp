from fastapi import FastAPI
import journeys
import stations

app = FastAPI()

app.include_router(journeys.router)
app.include_router(stations.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}
