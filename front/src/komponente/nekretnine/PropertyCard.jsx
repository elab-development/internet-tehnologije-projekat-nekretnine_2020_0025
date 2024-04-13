import React, { useState } from 'react';
import './PropertyCard.css';
import Modal from './Modal';  

const PropertyCard = ({ property }) => {
  const [showModal, setShowModal] = useState(false);  

  // Funkcija za otvaranje modala
  const openModal = () => {
    setShowModal(true);
  };

  // Funkcija za zatvaranje modala
  const closeModal = () => {
    setShowModal(false);
  };
 
  return (
    <div className="property-card">
      <div className="property-header">
        <h3>{property.title}</h3>
      </div>
      <div className="property-content">
        <p>Description: {property.description}</p>
        <p>Price: {property.price}</p>
        <p>Bedrooms: {property.bedrooms}</p>
        <p>Property Type: {property.propery_type.name}</p>
        {/* Proveravamo da li nekretnina ima slike */}
        {property.images.length > 0 && (
          <button onClick={openModal}>Prikaži Galeriju</button>
        )}
      </div>
      {/* Modal komponenta za prikaz galerije slika */}
      {showModal && (
        <Modal onClose={closeModal}>
        
          <h2>Galerija Slika</h2>
          <div className="image-gallery">
            {property.images.map((image, index) => (
              <img key={index} src={image} alt={`Slika ${index + 1}`} />
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PropertyCard;
