import React from "react";
import {Button} from "../../UI";
import { DropdownInput } from "../../UI/Inputs";
import './entityFields.scss';

export const EntityFields = (
  {
    onTextChange,
    onSubmitClick,
    getDropdownTags,
    setTags,
    text = '',
    currentTags = [],
    dropdownTags,
    type = '',
    rows = 4,
    placeholder,
    buttonText = 'Add'
  }) => {
  const handleTextAreaChange = (e) => {
    e.preventDefault();
    onTextChange(e.target.value);
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
        !exist && setTags([...currentTags, dropdownTags[i]]);
        break;
      }
    }
  }

  const deleteTag = (e, id) => {
    e.preventDefault();
    const withoutDeleted = currentTags.filter(tag => tag.id !== id);
    setTags(withoutDeleted);
  }

  return (
    <div className="row entity-fields pl-2 w-100">
      <div className="col-lg-12 textarea-div mb-2">
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
              <DropdownInput handleChange={getDropdownTags} handleClick={addTag} items={dropdownTags}/>
            </div>
            }
            <div className="col-lg-6 tags-div pt-1">
              {currentTags.map((tag, i) =>
                  <span key={`tag ${i}`} className="tag py-2 px-3 mr-2 mt-1">
                    {tag.name}
                  <span onClick={(e) => deleteTag(e, tag.id)}> &times;</span>
            </span>
              )}
            </div>
          </>
          : null
      }
      <div className="col-lg-12 text-right">
        <Button handleClick={onSubmitClick} style='add'>{buttonText}</Button>
      </div>
    </div>
  )
}
