import React, { useReducer, useEffect } from 'react';

import { validate } from '../util/validators';
import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true
      };
    }
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };



  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        pattern={props.pattern}
        placeholder={props.placeholder}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        placeholder={props.placeholder}
        value={inputState.value}
        style={props.style}
      />
    );

  return (
    <div
      className={`form-control ${!inputState.isValid &&
        inputState.isTouched && 'form-control--invalid'}`}
    >
      <label htmlFor={props.id}>{props.label}</label>

      {element}
      {
        <p className={
          inputState.value !== '' ? 'placeholder placeholder-touched' :
            inputState.isTouched && !inputState.isValid ? `placeholder placeholder-touched` : `placeholder`
        }
        >
          {inputState.isTouched && !inputState.isValid ? props.error_Text : props.custom_placeholder
          }
        </p>
      }
    </div >
  );
};

export default Input;
