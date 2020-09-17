import React from "react";
import Button from "../Button";
import DropdownInput from "../DropdownInput";
import './entityFields.scss';

const EntityFields = (
  {
    setTextFunc,
    finalFunc,
    getDropdownTagsFunc,
    setTagsFunc,
    text = '',
    currentTags = [],
    dropdownTags,
    type = '',
    rows = 4,
    placeholder
  }) => {
  const handleTextAreaChange = (e) => {
    e.preventDefault();
    setTextFunc(e.target.value);
  }

  const addTag = (id) => {
    for (let i = 0; i < dropdownTags.length; i += 1) {
      if (dropdownTags[i].id === id) {
        let exist = false;
        currentTags.forEach(tag => {
          if (tag.id === id) {
            exist = true;
          }
        })
        !exist && setTagsFunc([...currentTags, dropdownTags[i]]);
        break;
      }
    }
  }

  const deleteTag = (e, id) => {
    e.preventDefault();
    const withoutDeleted = currentTags.filter(tag => tag.id !== id);
    setTagsFunc(withoutDeleted);
  }

  return (
    <div className="row edit-entity pl-2 w-100">
      <div className="col-lg-12 textarea-div">
        <textarea
          className="w-100"
          onClick={e => e.preventDefault()}
          value={text}
          placeholder={placeholder}
          onChange={handleTextAreaChange}
          rows={rows}
        />
      </div>
      {
        type === "post"
          ? <>
            {currentTags.length < 3 &&
            <div className="col-lg-6 tags-dropdown-div">
              <DropdownInput onChangeFunc={getDropdownTagsFunc} onClickFunc={addTag} items={dropdownTags}/>
            </div>
            }
            <div className="col-lg-6 tags-div">
              {currentTags.map((tag, i) =>
                  <span key={`tag ${i}`} className="tag">
              {tag.name}
                    <span onClick={(e) => deleteTag(e, tag.id)}> &times;</span>
            </span>
              )}
            </div>
          </>
          : null
      }
      <div className="col-lg-12 text-right">
        <Button onClickFunc={finalFunc} style='add'>Save</Button>
      </div>
    </div>
  )
}

export default EntityFields;
