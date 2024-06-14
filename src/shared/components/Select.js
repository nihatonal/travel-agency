
import React, { useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import Input from './Input';
import './Select.css'
function Select(props) {
  return (
    <div className='select-containers'>
      <p className="select_label">Country</p>
      <p className="select_value">{props.isRadio}<IoMdArrowDropdown /> </p>
      {props.data.map((item, i) =>
        <ul className='select_wrapper' key={item}>
          <li>
            <input
              type='radio'
              id={item}
              value={item}
              onChange={props.handleChange}
              checked={props.checked === i}
            />
            <label htmlFor={item}>{item}</label>
          </li>

        </ul>
      )}

    </div >
  );
}

export default Select;