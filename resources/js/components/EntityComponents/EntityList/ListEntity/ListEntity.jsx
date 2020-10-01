import React, {useState} from "react";
import {Link} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import {faThumbsUp, faThumbsDown, faCommentDots} from '@fortawesome/free-regular-svg-icons';
import '@fortawesome/fontawesome-svg-core';
import {prettyDate} from "../../../../helpers/dateConverter";
import {TextWithMentions} from "../../../HelperComponents";
import './listEntity.scss';
import {EntityFields} from "../../";
import {IconWithCount} from "../../../UI";
import {ROUTES} from "../../../../helpers/routes";
import {handleImageError} from "../../../../helpers/anotherMethods";

const ListEntity = (
  {
    data,
    type,
    showDropdown = false,
    delFunc,
    updateFunc,
    getTagsFunc,
    setReactionFunc,
    deleteReactionFunc
  }) => {
  const {
    id,
    text,
    created_at,
    likes_count,
    dislikes_count,
    comments_count,
    liked,
    tags = [],
    mentioned_users = [],
    user = {}
  } = data;
  const {login, avatar, name, id: user_id} = user;

  const [editMode, setEditMode] = useState(false);
  const [textValue, setTextValue] = useState(text);
  const [currentTags, setTags] = useState(tags);
  const [tagsForDropdown, setTagsForDropdown] = useState([]);

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
    setEditMode(false);
    setTagsForDropdown([]);
    updateFunc(id, textValue, currentTags);
  }

  const getTagsForDropdown = (name) => {
    getTagsFunc(name).then(
      tags => {
        setTagsForDropdown(tags.data)
      }
    );
  }

  const handleReactionClick = (reactionType) => {
    if (reactionType) {
      liked ? deleteReactionFunc(id) : setReactionFunc(id, true);
    } else {
      (liked === false) ? deleteReactionFunc(id) : setReactionFunc(id, false);
    }
  }

  return (
    <div className="entity w-100">
      <div className="row">
        <div className="post-img col-1">
          {avatar
            ?
            <Link to={ROUTES.USERS + `/${user_id}`}>
              <img src={avatar} onError={handleImageError} alt={login} className="img-fluid"/>
            </Link>
            : <Skeleton height={50} width={50} circle={true}/>
          }
        </div>
        <div className="post-text-buttons col-11">
          <div className="row">
            <div className="col-lg-12 post-author px-3 d-flex">
              {created_at
                ? <>
                  <Link to={ROUTES.USERS + `/${user_id}`}>{name}</Link> · @{login} · {prettyDate(created_at)}
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
                    <IconWithCount
                      icon={faThumbsUp}
                      onclickFunc={() => handleReactionClick(true)}
                      count={likes_count}
                      styles={"up-span " + (liked === true ? "liked" : "")}
                    />
                  </div>
                  <div className="col-lg-4">
                    <IconWithCount
                      icon={faThumbsDown}
                      onclickFunc={() => handleReactionClick(false)}
                      count={dislikes_count}
                      styles={"down-span " + (liked === false ? "disliked" : "")}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Link to={ROUTES.POSTS + `/${id}`}>
                      <IconWithCount
                        icon={faCommentDots}
                        count={comments_count}
                        styles="comment-span"
                      />
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