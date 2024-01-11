import React, { useState, useEffect } from 'react';
import './RealEstateListings.css';
import axios from 'axios';
const RealEstateListings = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  

  const options = {
    method: 'GET',
    url: 'https://api.rentcast.io/v1/properties',
  //  params: {address: '5500 Grand Lake Dr, San Antonio, TX, 78244'},
    headers: {
        accept: 'application/json',
        'X-API-KEY': '42354440f0ac4a259e40548d48b19590'   
    }
};

axios
    .request(options)
    .then(function (response) {
        console.log(response.data);
        setIsLoading(false)
    })
    .catch(function (error) {
        console.error(error);
    });


 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="listings">
      {listings.map(listing => (
        <div key={listing.id} className="listing">
          <h3>{listing.title}</h3>
          <p>{listing.description}</p>
          <p>Price: {listing.price}</p>
         
        </div>
      ))}
    </div>
  );
};

export default RealEstateListings;
