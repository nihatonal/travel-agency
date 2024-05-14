import React from 'react';


import './Select.css'
function Select(props) {
    return (
        <div className='select_container'>
            <p className="select" onClick={props.showOptions}>
                {props.room === 'room1' ? "Room 1"
                    : props.room === 'room2' ? "Room 2"
                        : props.room === 'room3' ? "Room 3"
                            : "Villa Masal"}
            </p>
            <ul className="options_container"
                style={props.options ? { display: "flex" } : { display: "none" }}
            >
                <li onClick={props.onClick} id='room1' className="options_item">Room 1</li>
                <li onClick={props.onClick} id='room2' className="options_item">Room 2</li>
                <li onClick={props.onClick} id='room3' className="options_item">Room 3</li>
                <li onClick={props.onClick} id='villamasal' className="options_item">Villa Masal</li>
            </ul>

        </div >
    );
}

export default Select;