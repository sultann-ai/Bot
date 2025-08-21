from fastapi import FastAPI
from pydantic import BaseModel
from inference import predict_sentiment
import uvicorn

app = FastAPI(title="Sentiment Analysis Service")

# --- Correct indentation here ---
class TextRequest(BaseModel):
    message: str

@app.post("/predict")
def predict(request: TextRequest):
    result = predict_sentiment(request.message)
    return result

@app.get("/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
