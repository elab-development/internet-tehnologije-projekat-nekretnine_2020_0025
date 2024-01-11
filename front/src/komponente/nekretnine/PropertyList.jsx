import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PropertyList.css';
import PropertyCard from './PropertyCard';

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
         <PropertyCard key={property.id} property={property}></PropertyCard>
         
      ))}
    </div>
  );
};

export default PropertyList;
