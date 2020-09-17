import React, {useState} from "react";
import './addEntity.scss'
import EntityFields from "../EntityFields";

const AddEntity = (
  {
    addEntityFunc,
    getTagsFunc,
    type = "",
    placeholder,
    tagsList,
  }) => {
  const [textValue, setTextValue] = useState('');
  const [tags, setTags] = useState([]);

  const handleClickAdd = (e) => {
    e.preventDefault();
    if (textValue) {
      addEntityFunc(textValue, tags);
      setTextValue('');
      setTags([]);
    }
  }

  return (
    <div className="add-entity w-100">
      <EntityFields
        setTextFunc={setTextValue}
        finalFunc={handleClickAdd}
        setTagsFunc={setTags}
        getDropdownTagsFunc={getTagsFunc}
        text={textValue}
        currentTags={tags}
        dropdownTags={tagsList}
        type={type}
        placeholder={placeholder}
        rows={3}
      />
    </div>
  )
};

export default AddEntity;
