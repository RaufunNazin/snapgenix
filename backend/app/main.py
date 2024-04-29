# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.auth import auth_router
from app.photo import photo_router
from app.booking import booking_router
from app.dependencies import get_db
import os

# Create FastAPI app instance
app = FastAPI()

# CORS settings
origins = [
    "http://localhost",
    "http://localhost:5173",
    # Add other allowed origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

# Include routers
app.include_router(auth_router)
app.include_router(photo_router)
app.include_router(booking_router)

# Other configurations
DATABASE_URL = os.getenv("DATABASE_URL")

async def startup_event():
    # Establish database connection
    app.state.db = await get_db(DATABASE_URL)

async def shutdown_event():
    # Close database connection
    await app.state.db.disconnect()

# Register startup and shutdown event handlers
app.add_event_handler("startup", startup_event)
app.add_event_handler("shutdown", shutdown_event)

# Run the FastAPI app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
