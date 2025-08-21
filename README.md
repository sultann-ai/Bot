SENTIMENT ANALYZER

OVERVIEW
This project is a small, production-ready full stack web app for binary sentiment analysis (positive vs. negative). Users enter text in a simple web page, the Express.js backend forwards the text to a lightweight Python FastAPI service that runs an ML model (CountVectorizer + Multinomial Naive Bayes), stores the result in SQLite, and returns the prediction to the frontend. A short, expandable history shows recent analyses.

KEY FEATURES

Simple, responsive UI (vanilla HTML, CSS, JavaScript)

Predicts positive or negative sentiment with confidence

Persists every analysis in SQLite with timestamp

History list with Show More / Show Less toggle

Clean separation of concerns (frontend, Node/Express API, Python ML service)

Easily extensible to new models or labels

SYSTEM ARCHITECTURE (TEXT DIAGRAM)
Browser (HTML/CSS/JS)
→ POST /api/analyze (Node/Express)
→ POST /predict (Python FastAPI ML service)
← {label, confidence} (from Python to Node)
→ INSERT into SQLite sentiments table
← {id, text, label, confidence} (Node to Browser)

Additionally:
Browser → GET /api/history → Node/Express → SELECT from SQLite → Browser

TECH STACK AND RATIONALE
Frontend

HTML5, CSS3 with CSS variables for theming, vanilla JavaScript for fetch and DOM updates

No build step required; can be hosted as static files

Backend (API)

Node.js (LTS), Express.js for routing and middleware

CORS for cross-origin requests from the static frontend

dotenv for environment configuration

axios or native fetch for calling the Python service

sqlite3 and sqlite (promise wrapper) for database access

Database

SQLite for a lightweight, file-based relational DB

Automatic table creation on startup

Suitable for local and small deployments

Machine Learning Service

Python 3.x

FastAPI for a fast, minimal REST service

scikit-learn for classical ML (CountVectorizer + MultinomialNB)

pandas for data loading and preprocessing

joblib for model and vectorizer persistence

uvicorn as the ASGI server

python-dotenv for configuration

Model

Binary classifier: positive vs. negative

Text vectorization via CountVectorizer

Multinomial Naive Bayes for fast training and inference

Saved artifacts: model/sentiment_model.pkl and model/vectorizer.pkl