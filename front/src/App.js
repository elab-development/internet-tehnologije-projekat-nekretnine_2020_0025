 
import './App.css';
import HomePage from './komponente/pocetna/HomePage'; 
import PropertyList from './komponente/nekretnine/PropertyList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContactForm from './komponente/Contact/ContactForm';
import Messages from './komponente/Messages/Messages';
import { useState } from 'react';
import Login from './komponente/login/Login';
import Navbar from './komponente/Navbar/Navbar';
import Register from './komponente/login/Register';
function App() {
  const [messages, setMessages] = useState([]);
  const [token, setToken] = useState(null);
  return (
    <div className="App">
    <BrowserRouter>
      <Navbar token={token} setToken={setToken}></Navbar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register  />} />  {/*dodato   */}
   
        <Route path="/login" element={<Login setToken={setToken} />} />  {/*dodato   */}
        <Route path="/messages" element={<Messages messages={messages} setMessages={setMessages}/>} />
        <Route path="/contact" element={<ContactForm messages={messages} setMessages={setMessages}/>} />
        <Route path="/property-list" element={<PropertyList />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
