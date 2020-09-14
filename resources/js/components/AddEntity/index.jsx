import React, {useState} from "react";
import Button from "../Button";
import './addEntity.scss'
import Skeleton from "react-loading-skeleton";

const AddEntity = ({ addFunc, rows = 2, type="", loading = false, placeholder }) => {
  const [textAreaValue, setTextAreaValue] = useState('');

  const handleClick = (e) => {
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
          { !loading
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
        <div className="col-lg-6 mentioned-div">
          {/*<b>mention</b>*/}
        </div>
        <div className="col-lg-6 button-div text-right">
          { !loading
          ? <Button onClickFunc={handleClick} style="add">Add {type}</Button>
          : <Skeleton height={35} width={100} />}
        </div>
      </div>
    </div>
  )
};

export default AddEntity;
