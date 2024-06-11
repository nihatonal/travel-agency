import React from 'react';

import Hero from './hero/Hero';
import About from './about/About';
import Services from './services/Services';
import Gallery from './gallery/Gallery';
import Testimonials from './testimonials/Testimonials';
import Contact from "./contact/Contact";
import Countries from './countries/Countries';

import './Main.css';
function Main(props) {

    return (
        <div className='main-container'>
            <div className="main-wrapper">
                <Hero />
                <About />
                <Services />
                <Countries />
                <Gallery />
                <Testimonials />
                <Contact />
            </div>

        </div>
    );
}

export default Main;