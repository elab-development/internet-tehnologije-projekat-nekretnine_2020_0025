import logo from './logo.svg';
import './App.css';
import HomePage from './komponente/pocetna/HomePage'; 
import PropertyList from './komponente/nekretnine/PropertyList';

function App() {
  return (
    <div className="App">
       <HomePage></HomePage>
      <PropertyList></PropertyList>
    </div>
  );
}

export default App;
