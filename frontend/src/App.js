import './App.css';

function App() {
  const reqBody = {
    "username": "test",
    "password": "test"
  }
  fetch('api/auth/login', {
    "headers": {
      "Content-Type": "application/json"
    },
    "method": "post",
    "body": JSON.stringify(reqBody)
  });
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
