const analyzeBtn = document.getElementById('analyze-btn');
const textInput = document.getElementById('text-input');
const resultDiv = document.getElementById('result');
const historyList = document.getElementById('history-list');
const showMoreBtn = document.getElementById('show-more-btn');

const API_URL = 'http://localhost:8080/api';
let fullHistory = [];
let showAll = false;

async function analyzeText() {
    const text = textInput.value.trim();
    if (!text) return alert('Please enter some text.');

    try {
        const response = await fetch(`${API_URL}/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        const data = await response.json();

        resultDiv.innerHTML = `Sentiment: <span class="${data.label}">${data.label}</span> (Confidence: ${data.confidence.toFixed(2)})`;

        fetchHistory();
        textInput.value = '';
    } catch (err) {
        console.error(err);
        alert('Error analyzing text.');
    }
}

async function fetchHistory() {
    try {
        const response = await fetch(`${API_URL}/history`);
        fullHistory = await response.json();
        renderHistory();
    } catch (err) {
        console.error(err);
    }
}

function renderHistory() {
    historyList.innerHTML = '';
    const itemsToShow = showAll ? fullHistory.length : 5;
    fullHistory.slice(0, itemsToShow).forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `[<span class="${item.label}">${item.label.toUpperCase()}</span>] ${item.text}`;
        historyList.appendChild(li);
    });
    showMoreBtn.style.display = fullHistory.length > 5 ? 'block' : 'none';
    showMoreBtn.textContent = showAll ? 'Show Less' : 'Show More';
}

showMoreBtn.addEventListener('click', () => {
    showAll = !showAll;
    renderHistory();
});

analyzeBtn.addEventListener('click', analyzeText);
window.onload = fetchHistory;
