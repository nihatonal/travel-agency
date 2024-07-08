import React from 'react';
import { NavLink } from "react-router-dom"

import moment from 'moment';

import './TourCard.css';
function TourCard(props) {
    const data = props.data;
    return (
        <div className={`tourist-card-wrapper ${props.className}`}
            style={props.style}>

            <div className="tourist-card-content">
                <div className="tourist-card-content_title" >
                    <h4 className="tourist-card-title">{data.otel}</h4>
                    {/* <p>{data.location} - {moment(new Date(data.date)).format("MMMM / YYYY")}</p> */}
                </div>
                <div className="tourist-card-content-items">
                    <p><span>Country</span><span>:</span><span>&nbsp;{data.country}</span></p>
                    <p><span>City</span><span>:</span><span>&nbsp;{data.city}</span></p>
                    <p><span>Date</span><span>:</span><span>&nbsp;{moment(new Date(data.date)).format("MMMM / YYYY")}</span></p>
                    <p><span>Cost</span><span>:</span><span>&nbsp;{data.cost}</span></p>
                    <p><span>Link</span><span>:</span> <span>&nbsp;{data.link}/{data.id}</span></p>
                    <p><span>Code</span><span>:</span> <span>&nbsp;{data.touristcode}</span></p>
                    <p><span>Commet</span><span>:</span><span>&nbsp;{data.comment}</span></p>
                </div>
                <div className="tourist-card-btns">
                    <NavLink to={`/admin/tourists/${data.id}`} className='btn btn-tourist-card submit-btn'>Update</NavLink>
                    <button className='btn btn-tourist-card delete-btn' onClick={props.deleteWarningHandler}>Delete</button>
                </div>
            </div>
            {props.children}
        </div >
    );
}

export default TourCard;