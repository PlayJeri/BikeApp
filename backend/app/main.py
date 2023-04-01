from fastapi import FastAPI
import journeys

app = FastAPI()

app.include_router(journeys.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}
