from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(title="AetherGuard API")

class Comment(BaseModel):
    text: str
    user_id: Optional[str] = "anonymous"

class ModerationResult(BaseModel):
    is_toxic: bool
    score: float
    category: str

@app.get("/")
async def root():
    return {"message": "AetherGuard AI Moderation API is running"}

@app.post("/moderate", response_model=ModerationResult)
async def moderate_comment(comment: Comment):
    # This is a placeholder for the actual AI model inference
    # In a real scenario, this would call the toxicity_model.py functions
    text = comment.text.lower()
    
    # Simple mock logic
    toxic_words = ["hate", "stupid", "ugly", "violent"]
    is_toxic = any(word in text for word in toxic_words)
    score = 0.95 if is_toxic else 0.05
    category = "Hate Speech" if is_toxic else "Safe"
    
    return {
        "is_toxic": is_toxic,
        "score": score,
        "category": category
    }

@app.get("/stats")
async def get_stats():
    return {
        "total_analyzed": 12482,
        "toxic_detected": 1240,
        "safety_score": 0.982
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
