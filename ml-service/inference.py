# =========================================
# File: ml-service/inference.py
# =========================================
import joblib
import os


model_path = 'model/sentiment_model.pkl'
vectorizer_path = 'model/vectorizer.pkl'


model = joblib.load(model_path)
vectorizer = joblib.load(vectorizer_path)


def predict_sentiment(text):
    vec = vectorizer.transform([text])
    label = model.predict(vec)[0]
    proba = model.predict_proba(vec).max()
    return {'label': label, 'confidence': float(proba)}
