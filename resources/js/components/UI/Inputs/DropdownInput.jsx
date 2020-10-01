import React from "react";
import './styles/dropdownInput.scss';
import { Input } from "./Input";

export const DropdownInput = ({items = [], onChangeFunc, onClickFunc}) => {
  let itemsList = [];

  if (items.length > 0) {
    itemsList = items.map(item =>
      <button
        key={item.id}
        className="dropdown-item"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onClickFunc(item.id);
        }}
      >
        {item.name}
      </button>)
  }

  const handleChange = (e) => {
    e.preventDefault();
    onChangeFunc(e.target.value);
  }

  return (
    <>
      <Input
        type="text"
        placeholder="Add tags"
        onChangeFunc={handleChange}
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
