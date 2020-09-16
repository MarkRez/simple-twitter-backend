import React from "react";
import Button from "../../Button";

const EditEntity = ({ setValueFunc, saveFunc ,value }) => {

  const handleTextAreaChange = (e) => {
    e.preventDefault();
    setValueFunc(e.target.value);
  }

  return (
    <>
      <textarea
        className="w-100"
        onClick={e => e.preventDefault()}
        value={value}
        onChange={handleTextAreaChange}
        rows="4"
      />
      <Button onClickFunc={saveFunc} style='add'>Save</Button>
    </>
  )
}

export default EditEntity;
