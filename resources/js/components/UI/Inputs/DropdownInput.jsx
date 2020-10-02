import React from "react";
import { Input } from "./Input";
import './styles/dropdownInput.scss';

export const DropdownInput = ({items = [], handleChange, handleClick}) => {
  let itemsList = [];

  if (items.length > 0) {
    itemsList = items.map(item =>
      <button
        key={item.id}
        className="dropdown-item"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          handleClick(item.id);
        }}
      >
        {item.name}
      </button>)
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    handleChange(e.target.value);
  }

  return (
    <>
      <Input
        type="text"
        placeholder="Add tags"
        handleChange={handleInputChange}
      />
      <div
        className="dropdown-menu dropdown-input"
        style={{display: items.length > 0 ? "block" : "none"}}
        aria-labelledby="dropdownMenu2"
      >
        {itemsList}
      </div>
    </>
  )
}
