import './App.css';

const API_HOST = 'http://localhost:8000';

let csrfToken = '';

async function getCsrfToken(): Promise<string> {
  if (csrfToken === '') {
    const response = await fetch(`${API_HOST}/csrf/`, {
      credentials: 'include',
    });
    const data = await response.json();
    csrfToken = data.csrfToken;
  }
  return csrfToken;
}

// Using an arrow function in render creates a new function each time the component renders,
// which may break optimizations based on strict identity comparison.
async function testRequest(method: string) {
  const response = await fetch(`${API_HOST}/ping/`, {
    method: method,
    headers: method === 'POST' ? { 'X-CSRFToken': await getCsrfToken() } : {},
    credentials: 'include',
  });
  const data = await response.json();
  return data.result;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={async () => {
            console.log(await testRequest('GET'));
          }}
        >
          DO THE EXERCISES
        </button>
        <button
          onClick={async () => {
            console.log(await testRequest('POST'));
          }}
        >
          TEST BUTTON
        </button>
      </header>
    </div>
  );
}

export default App;
