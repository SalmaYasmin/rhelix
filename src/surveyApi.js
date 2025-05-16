const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export async function submitSurveyWeb(data) {
  const response = await fetch(`${API_URL}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json();
}
