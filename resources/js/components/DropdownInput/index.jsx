import React from "react";
import './dropdownInput.scss';
import Input from "../Input";

const DropdownInput = ({items = []}) => {
  let itemsList = [];

  if (items.length > 0) {
    itemsList = items.map(item => <button key={item.id} className="dropdown-item" type="button">{item.name}</button>)
  }

  return (
    <>
      <Input
        type="text"
        placeholder="Add tags"
      />
      <div
        className="dropdown-menu dropdown-input"
        style={items.length > 0 && {display: "block"}}
        aria-labelledby="dropdownMenu2"
      >
        {itemsList}
      </div>
    </>
  )
}

export default DropdownInput;
