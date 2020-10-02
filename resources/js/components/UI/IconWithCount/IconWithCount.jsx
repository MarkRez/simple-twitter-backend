import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './iconWithCount.scss';

export const IconWithCount = ({icon, count, handleClick, styles}) => {
  return (
    <span onClick={handleClick} className={"icon-with-count-comp py-2 px-3 " + styles}>
      <FontAwesomeIcon icon={icon}/> {count}
    </span>
  )
}
