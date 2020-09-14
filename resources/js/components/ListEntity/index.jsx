import React, {useState} from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp, faThumbsDown, faCommentDots} from '@fortawesome/free-regular-svg-icons';
import '@fortawesome/fontawesome-svg-core';
import {prettyDate} from "../../helpers/dateConverter";
import './listEntity.scss';
import Button from "../Button";
import { cropText } from "../../helpers/anotherMethods";

const ListEntity = ({data, type, showDropdown = false, delFunc, updateFunc}) => {
  const {id, text, user_id, created_at, likes_count, dislikes_count, comments_count, liked, user = {}} = data;
  const {login, avatar, name} = user;

  const [editMode, setEditMode] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState(text);

  const handleImageError = (e) => {
    e.target.src = '/storage/avatars/default.jpg';
  }

  const handleDeleteClick = (e) => {
    e.preventDefault();
    delFunc(id);
  }

  const handleTextAreaChange = (e) => {
    e.preventDefault();
    setTextAreaValue(e.target.value);
  }

  const changeMode = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  }

  const handleSaveClick = (e) => {
    e.preventDefault();
    updateFunc(id, textAreaValue);
    setEditMode(false);
  }

  return (
    <div className="entity w-100">
      <div className="row">
        <div className="post-img col-1">
          {avatar
            ?
            <Link to={`/users/${user_id}`}>
              <img src={avatar} onError={handleImageError} alt="name" className="img-fluid"/>
            </Link>
            : <Skeleton height={50} width={50} circle={true}/>
          }
        </div>
        <div className="post-text-buttons col-11">
          <div className="row">
            <div className="col-lg-12 post-author px-3 d-flex">
              {created_at
                ? <>
                  <Link to={`/users/${user_id}`}>{name}</Link> · @{login} · {prettyDate(created_at)}
                  {showDropdown
                    ?
                    <div className="dropdown-div">
                      <button
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        &#8250;
                      </button>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <span className="dropdown-item" onClick={changeMode}>{editMode ? "Cancel" : 'Edit'}</span>
                        <span className="dropdown-item" onClick={handleDeleteClick}>Delete</span>
                      </div>
                    </div>
                    : null}
                </>
                : <Skeleton/>
              }
            </div>
            <div className="col-lg-12 post-text px-3">
              {editMode
                ? <>
                  <textarea
                    className="w-100"
                    onClick={e=>e.preventDefault()}
                    value={textAreaValue}
                    onChange={handleTextAreaChange}
                    rows="4"
                  />
                  <Button onClickFunc={handleSaveClick} style='add'>Save</Button>
                </>
                : text ? cropText(text) : <Skeleton count={type === "post" ? 3 : 2}/>}
            </div>
            {type === "post"
              ?
              <div className="col-lg-12 post-buttons row">
                <div className="col-lg-4">
                  <span className={"up-span " + (liked === true ? "liked" : "")}>
                    <FontAwesomeIcon icon={faThumbsUp}/> {likes_count}
                  </span>
                </div>
                <div className="col-lg-4">
                  <span className={"down-span " + (liked === false ? "disliked" : "")}>
                    <FontAwesomeIcon icon={faThumbsDown}/> {dislikes_count}
                  </span>
                </div>
                <div className="col-lg-4">
                    <span className="comment-span">
                      <FontAwesomeIcon icon={faCommentDots}/> {comments_count}
                    </span>
                </div>
              </div>
              : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListEntity;
