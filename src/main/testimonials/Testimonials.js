import React from 'react';
import { useInView } from "react-intersection-observer";

import { commentsData } from '../../assets/commentsData';
import SimpleSlider from '../../shared/UI/SimpleSlider';
import xx from '../../assets/images/hurgada.jpg';
import comment_1 from '../../assets/images/comments/masha.jpg';
import comment_2 from '../../assets/images/comments/mehmet.jpg'
import './Testimonials.css'
function Testimonials(props) {

    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0,
        rootMargin: "0px",
    });

    return (
        <section id='testimonials' className="section_container">
            <div className="section_wrapper" ref={ref}>
                <h3 className='section_title'>
                    Testimonials
                    <span className='section-suptitle'>CLIENT SAY</span>
                    <span className='section-title-separator'></span>
                </h3>
                <div className="testimonials-content-wrapper">
                    <div className="testimonials-contents" >
                        <SimpleSlider>

                            {commentsData.map((item) =>
                                <div className="testimonials-content-item" key={item.id}>
                                    <div className='testimonials-content-item-wrapper'>
                                        <img src={xx} alt='profil' />
                                        <p className='testimonials-content-item-comment'>
                                            {item.comment}
                                        </p>
                                        <p className="testimonials-content-item-author">
                                            {item.author}
                                        </p>
                                        <p className="testimonials-content-item-location">
                                            {item.location}
                                        </p>
                                        <p className="testimonials-content-item-date">
                                            {item.date}
                                        </p>
                                    </div>


                                </div>
                            )}
                        </SimpleSlider>
                    </div>

                    <div className={inView ? "testimonials-bg-item bg_img-in" : "testimonials-bg-item"}
                        style={{ animationDelay: "1150ms" }}
                    >
                        <img src={comment_2} alt="comment_1" />
                    </div>
                    <div className={inView ? "testimonials-bg-item bg_img-in" : "testimonials-bg-item"}
                        style={{ animationDelay: "550ms" }}
                    >
                        <img src={comment_1} alt="comment_1" />
                    </div>
                    <div className={inView ? "testimonials-bg-item bg_img-in" : "testimonials-bg-item"}
                        style={{ animationDelay: "850ms" }}
                    >
                        <img src={comment_2} alt="comment_1" />
                    </div>
                    <div className={inView ? "testimonials-bg-item bg_img-in" : "testimonials-bg-item"}
                        style={{ animationDelay: "550ms" }}
                    >
                        <img src={comment_1} alt="comment_1" />
                    </div>
                    <div className={inView ? "testimonials-bg-item bg_img-in" : "testimonials-bg-item"}
                        style={{ animationDelay: "450ms" }}
                    >
                        <img src={comment_2} alt="comment_1" />
                    </div>
                    <div className={inView ? "testimonials-bg-item bg_img-in" : "testimonials-bg-item"}
                        style={{ animationDelay: "950ms" }}
                    >
                        <img src={comment_1} alt="comment_1" />
                    </div>
                    <div className={inView ? "testimonials-bg-item bg_img-in" : "testimonials-bg-item"}
                         style={{ animationDelay: "350ms" }}
                    >
                        <img src={comment_2} alt="comment_1" />
                    </div>
                    <div className={inView ? "testimonials-bg-item bg_img-in" : "testimonials-bg-item"}
                        style={{ animationDelay: "1350ms" }}
                    >
                        <img src={comment_1} alt="comment_1" />
                    </div>

                </div>
            </div>
        </section >
    );
}

export default Testimonials;