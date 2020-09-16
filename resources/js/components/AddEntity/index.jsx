import React, {useState} from "react";
import Button from "../Button";
import './addEntity.scss'
import Skeleton from "react-loading-skeleton";
import DropdownInput from "../DropdownInput";

const AddEntity = (
  {
    addFunc,
    getTagsFunc,
    rows = 2,
    type = "",
    loading = false,
    placeholder,
    tagsList,
    showTagsInput = false
  }) => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [tags, setTags] = useState([]);

  const handleClickAdd = (e) => {
    e.preventDefault();
    addFunc(textAreaValue);
    setTextAreaValue('');
  }

  const handleTextAreaChange = (e) => {
    e.preventDefault();
    setTextAreaValue(e.target.value);
  }

  return (
    <div className="add-entity w-100">
      <div className="row px-2">
        <div className="col-lg-12 text-aria-div">
          {type
            ? <textarea
              className="w-100 mb-2"
              rows={rows}
              onChange={handleTextAreaChange}
              value={textAreaValue}
              placeholder={placeholder}
            />
            : <Skeleton height={40}/>
          }
        </div>
        <div className="col-lg-6 tags-div">
          {showTagsInput && <DropdownInput onChangeFunc={getTagsFunc} items={tagsList}/>}
        </div>
        <div className="col-lg-6 button-div text-right">
          {type
            ? <Button onClickFunc={handleClickAdd} style="add">Add {type}</Button>
            : <Skeleton height={35} width={100}/>}
        </div>
      </div>
    </div>
  )
};

export default AddEntity;
