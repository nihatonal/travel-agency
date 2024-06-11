
import React, { useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";

import './BasicSelect.css'
function BasicSelect(props) {

  const [show, setShow] = useState(false);
  return (
    <div className='select-container' onClick={() => setShow(!show)}>
      <span></span>
      <span></span>
      <p className="select-label">{props.label}</p>
      <p className="select-value">{props.value}</p>
      <IoMdArrowDropdown />
      <div className="select-options"
        style={show ? { height: "auto", bottom: `-${38 * props.data.length}px` } : { height: "0", bottom: `-${38 * props.data.length}px` }}
      >
        {props.data.map((el) =>
          <button className="option-item" onClick={props.onClick} id={el} key={el}>
            {el}
          </button>
        )}
      </div>
    </div >
  );
}

export default BasicSelect;