import React, {useState} from "react";
import './addEntity.scss'
import {EntityFields} from "../";

export const AddEntity = (
  {
    addEntityFunc,
    getTagsFunc,
    type = "",
    placeholder,
  }) => {
  const [textValue, setTextValue] = useState('');
  const [tags, setTags] = useState([]);
  const [tagsForDropdown, setTagsForDropdown] = useState([]);

  const handleClickAdd = (e) => {
    e.preventDefault();
    if (textValue) {
      setTextValue('');
      setTags([]);
      setTagsForDropdown([]);
      addEntityFunc(textValue, tags);
    }
  }

  const getTagsForDropdown = async (name) => {
    const response = await getTagsFunc(name)
    setTagsForDropdown(response.data)
  }

  return (
    <div className="add-entity w-100">
      <EntityFields
        setTextFunc={setTextValue}
        finalFunc={handleClickAdd}
        setTagsFunc={setTags}
        getDropdownTagsFunc={getTagsForDropdown}
        text={textValue}
        currentTags={tags}
        dropdownTags={tagsForDropdown}
        type={type}
        placeholder={placeholder}
        rows={3}
        buttonText="Add"
      />
    </div>
  )
};
