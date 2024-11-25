import asyncpg
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env

DATABASE_URL = os.getenv("DATABASE")  # Read the DATABASE URL from .env

async def connect_to_db():
    return await asyncpg.connect(DATABASE_URL)
