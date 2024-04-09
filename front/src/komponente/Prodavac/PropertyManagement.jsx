import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useNekretnine from '../customHooks/useNekretnine';
import './PropertyManagement.css';

const PropertyManagement = () => {
  const { data: properties, isLoading, error, setData: setProperties } = useNekretnine('http://127.0.0.1:8000/api/properties');
  const [showModal, setShowModal] = useState(false);
  const [newProperty, setNewProperty] = useState({
    title: '',
    description: '',
    price: '',
    property_type_id: '',
    bedrooms: '',
    images: [],
  });
  const [propertyTypes, setPropertyTypes] = useState([]); // Stanje za čuvanje tipova nekretnina
  const token = localStorage.getItem('token'); // Dohvatanje tokena iz localStorage-a

  useEffect(() => {
    // Učitavanje tipova nekretnina prilikom prvog renderovanja
    getPropertyTypes();
  }, []);

  const getPropertyTypes = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/property-types', {
        headers: {
          Authorization: `Bearer ${token}` // Postavljanje tokena u zaglavlje zahteva
        }
      });
      setPropertyTypes(response.data);
    } catch (error) {
      console.error('Error fetching property types:', error);
    }
  };

  const handleDeleteProperty = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Postavljanje tokena u zaglavlje zahteva
        }
      });
      // Brisanje nekretnine iz lokalne memorije
      const updatedProperties = properties.filter(property => property.id !== id);
      setProperties(updatedProperties);
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  const handleAddProperty = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/properties', newProperty, {
        headers: {
          Authorization: `Bearer ${token}` // Postavljanje tokena u zaglavlje zahteva
        }
      });
      setProperties([...properties, response.data.nekretnina]);
      setShowModal(false);
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  return (
    <div className="property-container">
      <h2>Properties</h2>
      <button onClick={() => setShowModal(true)}>+</button>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="property-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Bedrooms</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id}>
                <td>{property.title}</td>
                <td>{property.description}</td>
                <td>{property.price}</td>
                <td>{property.bedrooms}</td>
                <td>
                  <button onClick={() => handleDeleteProperty(property.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Add New Property</h2>
            <form>
              <label>Title:</label>
              <input type="text" name="title" value={newProperty.title} onChange={handleInputChange} />
              <label>Description:</label>
              <input type="text" name="description" value={newProperty.description} onChange={handleInputChange} />
              <label>Price:</label>
              <input type="number" name="price" value={newProperty.price} onChange={handleInputChange} />
              <label>Bedrooms:</label>
              <input type="number" name="bedrooms" value={newProperty.bedrooms} onChange={handleInputChange} />
              <label>Property Type:</label>
              <select name="property_type_id" value={newProperty.property_type_id} onChange={handleInputChange}>
                <option value="">Select Property Type</option>
                {propertyTypes.map((type) => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
              <button type="button" onClick={handleAddProperty}>Add Property</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyManagement;
