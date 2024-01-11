import React from 'react';
import './HomePage.css';
 

const HomePage = () => {
  return (
    <div className="about">
      <header className="about-header">
        <h1>About Our Real Estate Agency</h1>
        <p>Trusted by Thousands Since 1999</p>
      </header>
      <section className="about-intro">
        <h2>Welcome to Our Agency</h2>
        <p>Our mission is to empower clients to make smart decisions about their home purchase or sale.</p>
      </section>
      <section className="about-content">
        <h3>Who We Are</h3>
        <p>We are a team of dedicated real estate professionals with over two decades of experience in helping clients find their dream homes.</p>
        <h3>What We Offer</h3>
        <p>Our portfolio includes a wide range of properties to fit every lifestyle and budget, from cozy apartments to luxury estates.</p>
        <h3>Why Choose Us</h3>
        <p>Our commitment to excellence and our client-first approach ensure that your buying or selling experience is seamless and rewarding.</p>
      </section>
      <section className="about-values">
        <h2>Our Values</h2>
        <div className="values-list">
          <div className="value">
            <h4>Integrity</h4>
            <p>We believe in honest and transparent dealings with all our clients.</p>
          </div>
          <div className="value">
            <h4>Expertise</h4>
            <p>Our agents are highly skilled and knowledgeable about the real estate market.</p>
          </div>
          <div className="value">
            <h4>Commitment</h4>
            <p>Your satisfaction is our top priority, and we work tirelessly to meet your needs.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
