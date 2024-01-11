 
import './App.css';
import HomePage from './komponente/pocetna/HomePage'; 
import PropertyList from './komponente/nekretnine/PropertyList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      
      <Routes>
        
        <Route path="/" element={<HomePage />} />

       
        <Route path="/property-list" element={<PropertyList />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
