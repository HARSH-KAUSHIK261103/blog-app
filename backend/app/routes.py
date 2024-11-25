from fastapi import APIRouter, HTTPException, Body, Query
from app.database import connect_to_db
from app.models import BlogPost
from typing import List, Optional
from datetime import datetime
import pytz
from langchain.schema import Document
from langchain_openai import ChatOpenAI
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path="/.env")

router = APIRouter()

os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_API_KEY"] = ""
os.environ["OPENAI_API_KEY"] = "" 


# Fetch all blog posts
@router.get("/blogs", response_model=List[BlogPost])
async def get_blogs(category: Optional[str] = Query(None, description="Category to filter blog posts")):
    conn = await connect_to_db()
    try:
        if category:
            # Filter posts based on the category
            query = "SELECT * FROM BlogPosts WHERE LOWER(category) = LOWER($1);"
            rows = await conn.fetch(query, category)
        else:
            # If no category is provided, return all posts
            query = "SELECT * FROM BlogPosts;"
            rows = await conn.fetch(query)
        
        return [dict(row) for row in rows]
    finally:
        await conn.close()


@router.get("/posts/{post_id}", response_model=BlogPost)
async def get_blog(post_id: int):
    conn = await connect_to_db()
    try:
        query = "SELECT * FROM BlogPosts WHERE id = $1;"
        row = await conn.fetchrow(query, post_id)
        if row is None:
            raise HTTPException(status_code=404, detail="Blog post not found")
        return dict(row)
    finally:
        await conn.close()

@router.post("/blogs", response_model=BlogPost)
async def create_blog(blog_post: BlogPost):
    conn = await connect_to_db()
    try:
        # Automatically handle created_at in backend
        if blog_post.created_at is None:
            
            blog_post.created_at = datetime.now(pytz.UTC)
        
        insert_query = """
        INSERT INTO BlogPosts (img, created_at, category, title, description, user_name, user_email, user_image)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id;
        """
        blog_id = await conn.fetchval(
            insert_query,
            blog_post.img,
            blog_post.created_at,
            blog_post.category,
            blog_post.title,
            blog_post.description,
            blog_post.user_name,
            blog_post.user_email,
            blog_post.user_image,
        )
        blog_post.id = blog_id
        return blog_post
    finally:
        await conn.close()
        
@router.delete("/delete-blog/{post_id}", response_model=BlogPost)
async def delete_blog(post_id: int):
    conn = await connect_to_db()
    try:
        # Check if the blog post exists
        query = "SELECT * FROM BlogPosts WHERE id = $1;"
        row = await conn.fetchrow(query, post_id)
        if row is None:
            raise HTTPException(status_code=404, detail="Blog post not found")

        # Delete the blog post
        delete_query = "DELETE FROM BlogPosts WHERE id = $1;"
        await conn.execute(delete_query, post_id)

        # Return the deleted blog post data
        return dict(row)
    finally:
        await conn.close()  
        
# Generate summary for a post
@router.post("/summarize")
async def summarize_post(description: str = Body(..., embed=True)):
    try:
        # Convert input string to a Document
        doc = Document(page_content=description)
        docs = [doc]  # Ensure it's a list of documents

        # Define prompt
        prompt = ChatPromptTemplate.from_messages(
            [("system", "Write a concise summary of the following:\\n\\n{context}")]
        )

        # Instantiate the LLM model
        llm = ChatOpenAI(model="gpt-4")

        # Instantiate the chain
        chain = create_stuff_documents_chain(llm, prompt)

        # Generate summary
        result = chain.invoke({"context": docs})

        # Ensure correct result extraction
        if isinstance(result, dict) and "output" in result:
            summary = result["output"]
        else:
            summary = result  # Handle cases where result is already the output

        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
    
@router.put("/update-blog/{post_id}", response_model=BlogPost)
async def update_blog(post_id: int, description: str):
    conn = await connect_to_db()
    try:
        # Update the blog post description
        update_query = """
        UPDATE BlogPosts
        SET description = $1
        WHERE id = $2
        RETURNING *;
        """
        updated_row = await conn.fetchrow(update_query, description, post_id)
        
        if updated_row is None:
            raise HTTPException(status_code=404, detail="Blog post not found")
        
        # Return the updated blog post
        return dict(updated_row)
    finally:
        await conn.close()