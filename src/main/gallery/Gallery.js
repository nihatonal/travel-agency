import React, { useState, useEffect } from 'react';

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { galleryData } from "../../assets/galleryData";


import './Gallery.css'

function Gallery(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [select, setSelected] = useState('')

    let keys = Object.keys(galleryData).slice(1);
    let main_gallery = galleryData.main;

    useEffect(() => {
        const filter = galleryData[select];
        setImages(filter)
    }, [select])

    return (
        <div id='gallery' className="section_container gallery_container" >
            <div className="section_wrapper gallery_wrapper">
                <h3 className='section_title'>
                    Gallery
                    <span className='section-suptitle'>PORTFOLIO</span>
                    <span className='section-title-separator'></span>
                </h3>
                <div className="gallery-items-wrapper">
                    {main_gallery.map((item, index) =>
                        <div className="gallery-item" key={index}
                        >
                            <img src={item.src} alt='gallery' />
                            <div className="gallery-item-hover-content"
                                onClick={() => {
                                    setIsOpen(true)
                                    setSelected(keys[index])
                                }}
                            >
                                <h4 className="gallery-item-hover-content-title">
                                    {keys[index].toUpperCase()}
                                </h4>
                            </div>
                        </div>
                    )}
                </div>
                <div>

                    {isOpen && images && (
                        <Lightbox
                            mainSrc={images[photoIndex].src}
                            nextSrc={images[(photoIndex + 1) % images.length].src}
                            prevSrc={images[(photoIndex + images.length - 1) % images.length].src}
                            onCloseRequest={() => setIsOpen(false)}
                            onMovePrevRequest={() =>
                                setPhotoIndex((photoIndex + images.length - 1) % images.length)

                            }
                            onMoveNextRequest={() =>
                                setPhotoIndex((photoIndex + 1) % images.length)

                            }
                            imageTitle={select.toUpperCase()}
                        />
                    )}
                </div>
            </div>
        </div >

    );
}

export default Gallery;