 
import './App.css';
import HomePage from './komponente/pocetna/HomePage'; 
import PropertyList from './komponente/nekretnine/PropertyList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContactForm from './komponente/Contact/ContactForm';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      
      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/contact" element={<ContactForm />} />
        <Route path="/property-list" element={<PropertyList />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
