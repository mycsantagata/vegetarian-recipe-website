import './css/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Detail from './Detail';



function App() {
  const api_key = "db08ea289c5a4294ae9198a0dfe9cebc";

  return (
    <Router>
      <h1>Vegetarian Recipes</h1>
      <div className="App">
        
        <div className='content'>
          <Routes>
            <Route path='/' Component={() => <Home api_key={api_key}/>}/>
            <Route exact path='/detail/:id' Component={() => <Detail api_key={api_key}/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
