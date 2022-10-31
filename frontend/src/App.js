import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          dit <code>src/App.js</code> 
        </p>
        <a
          className="App-lifnk"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          ta mere la pute
        </a>
      </header>
    </div>
  );
}

export default App;
