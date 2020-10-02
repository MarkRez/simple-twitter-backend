import React from "react";
import './styles/input.scss'

export const Input = (props) => {
  const {  id, labelText, placeholder, handleChange, type, field, form = {} }= props;
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
        onClick={e => e.preventDefault()}
        placeholder={placeholder}
        onChange={handleChange}
        {...field}
      />
      {
        errors && (errors[field.name] && touched[field.name]) ? <small className="form-text small-error text-muted">{errors[field.name]}</small> : null
      }
    </>
  );
};
