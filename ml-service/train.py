import pandas as pd
from sklearn.model_selection import train_test_split   # <--- make sure this is here
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score
import joblib
import os

# ----------------------------
# Load dataset
# ----------------------------
data_path = 'data/sentiment_dataset.csv'
if not os.path.exists(data_path):
    raise FileNotFoundError(f"{data_path} not found!")

data = pd.read_csv(data_path)

# ----------------------------
# Clean dataset
# ----------------------------
# Drop rows with missing text or label
data = data.dropna(subset=['text', 'label'])

# Optionally, remove empty strings
data = data[data['text'].str.strip() != '']

# ----------------------------
# Prepare features and labels
# ----------------------------
X = data['text']
y = data['label']

# ----------------------------
# Split dataset
# ----------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ----------------------------
# Vectorize text
# ----------------------------
vectorizer = CountVectorizer()
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# ----------------------------
# Train model
# ----------------------------
model = MultinomialNB()
model.fit(X_train_vec, y_train)

# ----------------------------
# Evaluate
# ----------------------------
y_pred = model.predict(X_test_vec)
print('Accuracy:', accuracy_score(y_test, y_pred))

# ----------------------------
# Save model & vectorizer
# ----------------------------
os.makedirs('model', exist_ok=True)
joblib.dump(model, 'model/sentiment_model.pkl')
joblib.dump(vectorizer, 'model/vectorizer.pkl')

print("Model and vectorizer saved successfully!")
