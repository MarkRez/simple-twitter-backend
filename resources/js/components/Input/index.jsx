import React from "react";
import './input.scss'

const Input = (props) => {
  const {  id, labelText, placeholder, type, field, form: { errors, touched } }= props;
  return (
    <>
      { labelText
        ?
        <label htmlFor={id} className="input-component-label">
          {labelText}
        </label>
        : null }
      <input
        className="form-control"
        id={id}
        type={type}
        placeholder={placeholder}
        {...field}
      />
      {
        (errors[field.name] && touched[field.name]) ? <small className="form-text small-error text-muted">{errors[field.name]}</small> : null
      }
    </>
  );
};

export default Input;
