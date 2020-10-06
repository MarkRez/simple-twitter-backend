import React, {useState} from "react";
import {EntityFields} from "../";
import './addEntity.scss'

export const AddEntity = (
  {
    onAddClick,
    getTags,
    type = "",
    placeholder,
  }) => {
  const [textValue, setTextValue] = useState('');
  const [tags, setTags] = useState([]);
  const [tagsForDropdown, setTagsForDropdown] = useState([]);

  const handleClickAdd = () => {
    if (textValue) {
      setTextValue('');
      setTags([]);
      setTagsForDropdown([]);
      onAddClick(textValue, tags);
    }
  }

  const getTagsForDropdown = async (name) => {
    const response = await getTags(name)
    setTagsForDropdown(response.data)
  }

  return (
    <div className="add-entity p-3 w-100">
      <EntityFields
        onTextChange={setTextValue}
        onSubmitClick={handleClickAdd}
        setTags={setTags}
        getDropdownTags={getTagsForDropdown}
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
