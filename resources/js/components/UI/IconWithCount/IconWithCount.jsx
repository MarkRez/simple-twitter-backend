import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './iconWithCount.scss';

export const IconWithCount = ({icon, count, onclickFunc, styles}) => {
  return (
    <span onClick={onclickFunc} className={"icon-with-count-comp py-2 px-3 " + styles}>
      <FontAwesomeIcon icon={icon}/> {count}
    </span>
  )
}
