import logo from './logo.svg';
import './App.css';
import HomePage from './komponente/pocetna/HomePage';
import RealEstateListings from './komponente/realEstateListings/RealEstateListings';

function App() {
  return (
    <div className="App">
       <HomePage></HomePage>
       <RealEstateListings></RealEstateListings>
    </div>
  );
}

export default App;
