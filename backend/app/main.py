from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router  # Import your blog router

# Create the FastAPI app instance
app = FastAPI()

# Define allowed origins (replace with your deployed frontend URL)
origins = ["*"]

# Add CORS middleware to the FastAPI app to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Include the router with the blog routes
app.include_router(router, prefix="/api")

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to the Blog API"}
