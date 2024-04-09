import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useNekretnine from '../customHooks/useNekretnine';
import './PropertyManagement.css';

const PropertyManagement = () => {
  const { data: properties, isLoading, error, setData: setProperties } = useNekretnine('http://127.0.0.1:8000/api/properties');

  const token = localStorage.getItem('token'); // Dohvatanje tokena iz sessionStorage-a

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

  return (
    <div className="property-container">
      <h2>Properties</h2>
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
    </div>
  );
};

export default PropertyManagement;
