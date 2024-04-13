import React, { useState } from 'react';
import './PropertyCard.css';
import Modal from './Modal';  
import ReservationModal from './ReservationModal'; // Pretpostavljamo da imate komponentu za modal rezervacije

const PropertyCard = ({ property }) => {
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);

  // Funkcije za otvaranje i zatvaranje modala za galeriju slika
  const openGalleryModal = () => {
    setShowGalleryModal(true);
  };

  const closeGalleryModal = () => {
    setShowGalleryModal(false);
  };

  // Funkcije za otvaranje i zatvaranje moda za rezervaciju
  const openReservationModal = () => {
    setShowReservationModal(true);
  };

  const closeReservationModal = () => {
    setShowReservationModal(false);
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
          <div>
            <button onClick={openGalleryModal}>Prikaži Galeriju</button>
          
          </div>
        )}
      </div>
      <button onClick={openReservationModal}>Rezerviši</button>
      {/* Modal komponenta za prikaz galerije slika */}
      {showGalleryModal && (
        <Modal onClose={closeGalleryModal}>
          <h2>Galerija Slika</h2>
          <div className="image-gallery">
            {property.images.map((image, index) => (
              <img key={index} src={image} alt={`Slika ${index + 1}`} />
            ))}
          </div>
        </Modal>
      )}
      {/* Modal komponenta za rezervaciju */}
      {showReservationModal && (
        <ReservationModal onClose={closeReservationModal} property={property} />
      )}
    </div>
  );
};

export default PropertyCard;
