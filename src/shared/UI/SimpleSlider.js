import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './SimpleSlider.css'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function SampleNextArrow(props) {

    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style }}
            onClick={onClick}
        ><IoIosArrowForward /></div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style }}
            onClick={onClick}
        ><IoIosArrowBack /></div>
    );
}
export default class SimpleSlider extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }
    render() {
        var settings = {
            className: "center",
            centerMode: true,
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 0,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            responsive: [
                {
                    breakpoint: 1224,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                }
            ]

        };
        return (
            <div className="slider_container">
                <Slider ref={c => (this.slider = c)} {...settings}>
                    {this.props.children}
                </Slider>
                <div className="slider_btns_wrapper">
                    <SamplePrevArrow className='slider_arrow' onClick={this.previous} />
                    <SampleNextArrow className='slider_arrow' onClick={this.next} />
                </div>

            </div>


        );
    }
}