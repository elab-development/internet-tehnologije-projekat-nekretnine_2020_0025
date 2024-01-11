import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PropertyList.css';
import PropertyCard from './PropertyCard';
import ReactPaginate from 'react-paginate';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const propertiesPerPage = 3;  

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/properties')
      .then((response) => {
        setProperties(response.data.data);
        setFilteredProperties(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching properties:', error);
        setIsLoading(false);
      });
  }, []);

  const filterBySearchTerm = (value) => {
    setSearchTerm(value);
    const filteredProperties = properties.filter((property) =>
      property.description.toLowerCase().includes(value.toLowerCase()) ||
      property.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProperties(filteredProperties);
  };

  const filterByPropertyType = (type) => {
    setSelectedPropertyType(type);
    if (type === '') {
      setFilteredProperties(properties);
    } else {
      const filteredByType = properties.filter(
        (property) => property.propery_type.name === type
      );
      setFilteredProperties(filteredByType);
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const pageCount = Math.ceil(filteredProperties.length / propertiesPerPage);
  const offset = currentPage * propertiesPerPage;
  const currentProperties = filteredProperties.slice(offset, offset + propertiesPerPage);

  return (
    <div className="property-list">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by description or title"
          value={searchTerm}
          onChange={(e) => filterBySearchTerm(e.target.value)}
        />  
        <select
          value={selectedPropertyType}
          onChange={(e) => filterByPropertyType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Stan">Stan</option>
          <option value="Kuća">Kuća</option>
          <option value="Apartman">Apartman</option>
          <option value="Vikendica">Vikendica</option>
          <option value="Poslovni prostor">Poslovni prostor</option>
        </select>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
          {currentProperties.map((property) => (
            <PropertyCard key={property.id} property={property}></PropertyCard>
          ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
