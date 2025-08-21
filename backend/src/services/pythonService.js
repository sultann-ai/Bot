import axios from 'axios';

const PYTHON_URL = 'http://localhost:8000/predict';

// Correct function
export async function getSentimentFromPython(text) {
  try {
    const response = await axios.post(PYTHON_URL, {
      message: text   // <--- 'text' comes from the function parameter
    });
    return response.data; // { label, confidence }
  } catch (err) {
    console.error('Python service error:', err.message);
    return { label: 'unknown', confidence: 0 };
  }
}
