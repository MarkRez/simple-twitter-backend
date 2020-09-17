import React from "react";
import './input.scss'

const Input = (props) => {
  const {  id, labelText, placeholder, onChangeFunc, type, field, form = {} }= props;
  const { errors, touched } = form;
  return (
    <>
      { labelText
        ?
        <label htmlFor={id} className="input-component-label">
          {labelText}
        </label>
        : null }
      <input
        className="form-control component-input"
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChangeFunc}
        {...field}
      />
      {
        errors && (errors[field.name] && touched[field.name]) ? <small className="form-text small-error text-muted">{errors[field.name]}</small> : null
      }
    </>
  );
};

export default Input;
