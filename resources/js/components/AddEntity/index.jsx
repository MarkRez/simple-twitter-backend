import React, {useState} from "react";
import './addEntity.scss'
import EntityFields from "../EntityFields";

const AddEntity = (
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
      addEntityFunc(textValue, tags);
      setTextValue('');
      setTags([]);
      setTagsForDropdown([]);
    }
  }

  const getTagsForDropdown = (name) => {
    getTagsFunc(name).then(
      tags => {
        setTagsForDropdown(tags.data)
      }
    );
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

export default AddEntity;
