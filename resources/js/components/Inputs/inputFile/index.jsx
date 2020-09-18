import React, {useRef} from "react";

const InputFile = (props) => {
  const {  id, field: { value, ...fieldProps}, onChange, inputRef}= props;

  return (
    <>
      <input
        ref={inputRef}
        className="form-control"
        id={id}
        type="file"
        {...fieldProps}
        style={{display: 'none' }}
        onChange={(event) => {
          if (typeof onChange === 'function') {
            onChange(event);
          } else {
            fieldProps.onChange(event);
          }
        }}
      />
    </>
  );
};

export default InputFile;
