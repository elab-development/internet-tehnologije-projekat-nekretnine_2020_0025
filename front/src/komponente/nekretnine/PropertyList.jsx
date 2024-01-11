import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PropertyList.css';
import PropertyCard from './PropertyCard';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProp, setFilteredProperties] = useState(properties);
  useEffect(() => {
   
    axios.get('http://127.0.0.1:8000/api/properties')
      .then((response) => {
        console.log(response.data.data)
        setProperties(response.data.data);
        setFilteredProperties(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching properties:', error);
        setIsLoading(false);
      });
  }, []);


  const handleSearch = (vrednost) => {
    setSearchTerm(vrednost)
    const filteredProperties = properties.filter((property) =>
      property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.title.toLowerCase().includes(searchTerm.toLowerCase())
    ); 
    setFilteredProperties(filteredProperties);
  };



  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="property-list">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by description or title"
          value={searchTerm}
          onChange={(e) =>handleSearch(e.target.value)}
        />
        
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        filteredProp.map((property) => (
          <PropertyCard key={property.id} property={property}></PropertyCard>
        ))
      )}
    </div>
  );
};

export default PropertyList;
