import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PropertyList.css';
import PropertyCard from './PropertyCard';
import ReactPaginate from 'react-paginate';
import Navbar from '../Navbar/Navbar';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
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

  useEffect(() => {
    // Funkcija za filtriranje po ceni
    const filterByPrice = () => {
      const filteredByPrice = properties.filter((property) =>
        (minPrice === '' || parseInt(property.price) >= parseInt(minPrice)) &&
        (maxPrice === '' || parseInt(property.price) <= parseInt(maxPrice))
      );
      applyFilters(filteredByPrice);
    };

    filterByPrice();
  }, [minPrice, maxPrice, properties]);

  const applyFilters = (filteredData) => {
    // Funkcija za primenu svih filtera
    const filteredBySearch = filteredData.filter((property) =>
      property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedPropertyType) {
      const filteredByType = filteredBySearch.filter(
        (property) => property.propery_type.name === selectedPropertyType
      );
      setFilteredProperties(filteredByType);
    } else {
      setFilteredProperties(filteredBySearch);
    }
  };

  const filterBySearchTerm = (value) => {
    setSearchTerm(value);
    applyFilters(properties);
  };

  const filterByPropertyType = (type) => {
    setSelectedPropertyType(type);
    applyFilters(properties);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const pageCount = Math.ceil(filteredProperties.length / propertiesPerPage);
  const offset = currentPage * propertiesPerPage;
  const currentProperties = filteredProperties.slice(offset, offset + propertiesPerPage);

  return (
    <>
    <Navbar></Navbar>
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
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
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
    </div> </>
  );
};

export default PropertyList;
