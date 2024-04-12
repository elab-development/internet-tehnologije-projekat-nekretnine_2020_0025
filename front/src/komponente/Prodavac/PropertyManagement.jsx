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
      property_type_id: '1',
      bedrooms: '',
      images: [],
    });
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc'); // State za praćenje redosleda sortiranja
    const [searchTerm, setSearchTerm] = useState(''); // State za praćenje unosa korisnika za pretragu
  
    const token = localStorage.getItem('token');
  
    useEffect(() => {
      getPropertyTypes();
    }, []);
  
    const getPropertyTypes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/property-types', {
          headers: {
            Authorization: `Bearer ${token}`
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
            Authorization: `Bearer ${token}`
          }
        });
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
        if (selectedProperty) {
          await updateProperty(selectedProperty.id, newProperty);
        } else {
          await addProperty(newProperty);
        }
        setShowModal(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    const addProperty = async (propertyData) => {
      const response = await axios.post('http://127.0.0.1:8000/api/properties', propertyData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProperties([...properties, response.data.nekretnina]);
    };
  
    const updateProperty = async (id, propertyData) => {
      await axios.put(`http://127.0.0.1:8000/api/properties/${id}`, propertyData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedProperties = properties.map(property =>
        property.id === id ? { ...property, ...propertyData } : property
      );
      setProperties(updatedProperties);
    };
  
    const handleEditProperty = (property) => {
      setSelectedProperty(property);
      const editedProperty = {
        ...property,
        property_type_id: property.property_type_id || '', // Setovanje property type-a ili praznog stringa ako nije postavljen
      };
      setNewProperty(editedProperty);
      setShowModal(true);
    };
  
    const toggleSortOrder = () => {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };
  
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const filteredProperties = properties.filter(property =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const sortedProperties = filteredProperties.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  
    return (
      <div className="property-container">
        <h2>Properties</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={toggleSortOrder}>Sort by Title ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})</button>
        </div>
        <button onClick={() => setShowModal(true)}>Add New</button>
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
              {sortedProperties.map((property) => (
                <tr key={property.id}>
                  <td>{property.title}</td>
                  <td>{property.description}</td>
                  <td>{property.price}</td>
                  <td>{property.bedrooms}</td>
                  <td>
                    <button onClick={() => handleEditProperty(property)}>Edit</button>
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
              <h2>{selectedProperty ? 'Edit Property' : 'Add New Property'}</h2>
              <form style={{display:"grid"}}>
                <label>Title:</label>
                <input type="text" name="title" value={newProperty.title} onChange={handleInputChange} />
                <label>Description:</label>
                <input type="text" name="description" value={newProperty.description} onChange={handleInputChange} />
                <label>Price:</label>
                <input type="number" name="price" value={newProperty.price} onChange={handleInputChange} />
                <label>Bedrooms:</label>
                <input type="number" name="bedrooms" value={newProperty.bedrooms} onChange={handleInputChange} />
                {!selectedProperty && ( // Renderovanje komboboxa samo ako nije odabrana nekretnina za editovanje
                  <div>
                    <label>Property Type:</label>
                    <select name="property_type_id" value={newProperty.property_type_id} onChange={handleInputChange}>
                      <option value="">Select Property Type</option>
                      {propertyTypes.map((type) => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                <button type="button" onClick={handleAddProperty}>{selectedProperty ? 'Update Property' : 'Add Property'}</button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default PropertyManagement;
