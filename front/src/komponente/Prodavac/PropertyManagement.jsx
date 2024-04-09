import React, { useState, useEffect } from 'react'; 
import useNekretnine from '../customHooks/useNekretnine';
import './PropertyManagement.css' 

const PropertyManagement = () => {
  const { data: properties, isLoading, error } = useNekretnine('http://127.0.0.1:8000/api/properties');

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
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id}>
                <td>{property.title}</td>
                <td>{property.description}</td>
                <td>{property.price}</td>
                <td>{property.bedrooms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PropertyManagement;
