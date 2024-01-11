import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PropertyList.css';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   
    axios.get('http://127.0.0.1:8000/api/properties')
      .then((response) => {
        console.log(response.data.data)
        setProperties(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching properties:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="property-list">
      {properties.map((property) => (
        <div key={property.id} className="property">
          <h3>{property.title}</h3>
          <p>Description: {property.description}</p>
          <p>Price: {property.price}</p>
          <p>Bedrooms: {property.bedrooms}</p>
          <p>Property Type: {property.propery_type.name}</p>
          <div className="images">
            {property.images.map((image) => (
              <img
                key={image.id}
                src={image.url}
                alt={`Property Image ${image.id}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
