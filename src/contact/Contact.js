import React, { useContext } from 'react';
import { LanguageContext } from "../shared/context/Language";
import { useInView } from "react-intersection-observer";
import ContactForm from "./ContactForm";
import SocialBar from '../shared/navigation/SocialBar';
import './Contact.css';
function Contact(props) {
    const lang = useContext(LanguageContext);
    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0.2,
        rootMargin: "-0px",
    });
    return (
        <section ref={ref} id='contact' className="section_container contact_container">

            <div className="section_wrapper">
                <h3 className='section_title'>
                    Get in Touch
                    <span className='section-suptitle'>CONTACT</span>
                    <span className='section-title-separator'></span>
                </h3>
                <div className="contact-contents-wrapper">
                    <div className="contact-items_wrapper">
                        <div className="contact-item">
                            <h4 className="contact-item-title">Phone</h4>
                            <a href='www.google.com' target={'_blank'}>
                                +7 989 699 58 47
                            </a>
                        </div>
                        <div className="contact-item">
                            <h4 className="contact-item-title">Email</h4>
                            <a href='www.google.com' target={'_blank'}>
                                deneme@gmail.com
                            </a>
                        </div>
                        <SocialBar />
                    </div>
                    <ContactForm className={inView ? "show_opacity" : ""}
                        data_form={lang.dictionary["contact-form"]}
                        data_success_email={lang.dictionary["email_success"]}

                    />
                </div>

            </div>
        </section>
    );
}

export default Contact;