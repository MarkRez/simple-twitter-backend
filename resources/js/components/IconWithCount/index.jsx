import React from "react";
import './iconWithCount.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";

const IconWithCount = ({icon, count, onclickFunc, styles}) => {
  return (
    <span onClick={onclickFunc} className={styles}>
      <FontAwesomeIcon icon={icon}/> {count}
    </span>
  )
}

export default IconWithCount;
