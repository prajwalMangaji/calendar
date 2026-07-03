import './index.css';
import './App.css';
import Header from './components/Header/Header';
import Calendar from './components/Calendar/Calendar';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Calendar />
      </main>
    </div>
  );
}

export default App;
