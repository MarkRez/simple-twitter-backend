import React from "react";
import Button from "../Button";
import './addEntity.scss'
import Skeleton from "react-loading-skeleton";

const AddEntity = ({ addFunc, rows = 2, type="", loading = false }) => {
  return (
    <div className="add-entity w-100">
      <div className="row px-2">
        <div className="col-lg-12 text-aria-div">
          { !loading
            ? <textarea className="w-100 mb-2" rows={rows} placeholder="Share your opinion"/>
            : <Skeleton height={40}/>
          }
        </div>
        <div className="col-lg-6 mentioned-div">
          {/*<b>mention</b>*/}
        </div>
        <div className="col-lg-6 button-div text-right">
          { !loading
          ? <Button onClickFunc={addFunc} style="add">Add {type}</Button>
          : <Skeleton height={35} width={100} />}
        </div>
      </div>
    </div>
  )
};

export default AddEntity;
