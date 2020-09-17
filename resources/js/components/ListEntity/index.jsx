import React, {useState} from "react";
import {Link} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp, faThumbsDown, faCommentDots} from '@fortawesome/free-regular-svg-icons';
import '@fortawesome/fontawesome-svg-core';
import {prettyDate} from "../../helpers/dateConverter";
import TextWithMentions from "../TextWithMentions";
import './listEntity.scss';
import EntityFields from "../EntityFields";

const ListEntity = ({data, type, showDropdown = false, delFunc, updateFunc, getTagsFunc}) => {
  const {
    id,
    text,
    user_id,
    created_at,
    likes_count,
    dislikes_count,
    comments_count,
    liked,
    tags = [],
    mentioned_users = [],
    user = {}
  } = data;
  const {login, avatar, name} = user;

  const [editMode, setEditMode] = useState(false);
  const [textValue, setTextValue] = useState(text);
  const [currentTags, setTags] = useState(tags);
  const [tagsForDropdown, setTagsForDropdown] = useState([]);

  const handleImageError = (e) => {
    e.target.src = '/storage/avatars/default.jpg';
  }

  const handleDeleteClick = (e) => {
    e.preventDefault();
    delFunc(id);
  }

  const changeMode = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  }

  const handleSaveClick = (e) => {
    e.preventDefault();
    updateFunc(id, textValue, currentTags);
    setEditMode(false);
    setTagsForDropdown([]);
  }

  const getTagsForDropdown = (name) => {
    getTagsFunc(name).then(
      tags => {
        setTagsForDropdown(tags.data)
      }
    );
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
            {editMode
              ?
              <EntityFields
                setTextFunc={setTextValue}
                finalFunc={handleSaveClick}
                setTagsFunc={setTags}
                getDropdownTagsFunc={getTagsForDropdown}
                text={textValue}
                currentTags={currentTags}
                dropdownTags={tagsForDropdown}
                type={type}
                rows={4}
                buttonText="Save"
              />
              : <div className="col-lg-12 post-text px-3">
                {text
                  ? <TextWithMentions text={text} mentions={mentioned_users}/>
                  : <Skeleton count={type === "post" ? 3 : 2}/>}
              </div>
            }
            {type === "post"
              ?
              <>
                {
                  (currentTags.length !== 0 && !editMode) &&
                  <div className="col-lg-12 post-current-tags">
                    {currentTags.map((tag, i) =>
                      <span key={`tag ${i}`} className="tag">
                        {tag.name}
                      </span>
                    )}
                  </div>
                }
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
                    <Link to={`/posts/${id}`}>
                      <span className="comment-span">
                        <FontAwesomeIcon icon={faCommentDots}/> {comments_count}
                      </span>
                    </Link>
                  </div>
                </div>
              </>
              : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListEntity;
