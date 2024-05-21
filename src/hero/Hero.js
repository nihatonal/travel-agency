import React from 'react';


import './Hero.css'
function Hero(props) {
    return (
        <section id='home' className='hero-container'>
            <div className="hero-wrapper">
                <div className="hero-content">
                    <h1>Best Travel Agency</h1>
                    <p>Let's Discover The World Together</p>
                    <button>Plan Your Trip</button>
                </div>
            </div>
        </section>
    );
}

export default Hero;