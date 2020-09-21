import React from "react";
import './iconWithCount.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const IconWithCount = ({icon, count, onclickFunc, styles}) => {
  return (
    <span onClick={onclickFunc} className={"icon-with-count-comp  " + styles}>
      <FontAwesomeIcon icon={icon}/> {count}
    </span>
  )
}

export default IconWithCount;
