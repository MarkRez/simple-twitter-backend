import React from "react";
import Button from "../Button";
import './addEntity.scss'

const AddEntity = ({ addFunc, rows = 2, type="" }) => {
  return (
    <div className="add-entity w-100">
      <div className="row px-2">
        <div className="col-lg-12 text-aria-div">
        <textarea className="w-100 mb-2" rows={rows} placeholder="Share your opinion"></textarea>
        </div>
        <div className="col-lg-6 mentioned-div">
          {/*<b>mention</b>*/}
        </div>
        <div className="col-lg-6 button-div text-right">
          <Button onClickFunc={addFunc} style="add">Add {type}</Button>
        </div>
      </div>
    </div>
  )
};

export default AddEntity;
