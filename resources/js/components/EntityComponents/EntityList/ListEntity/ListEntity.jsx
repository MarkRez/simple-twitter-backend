import React, {useState} from "react";
import {Link} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import {faThumbsUp, faThumbsDown, faCommentDots} from '@fortawesome/free-regular-svg-icons';
import '@fortawesome/fontawesome-svg-core';
import {prettyDate} from "../../../../helpers/dateConverter";
import {TextWithMentions} from "../../../HelperComponents";
import {EntityFields} from "../../";
import {IconWithCount} from "../../../UI";
import {ROUTES} from "../../../../helpers/routes";
import {handleImageError} from "../../../../helpers/anotherMethods";
import './listEntity.scss';

const ListEntity = (
  {
    data,
    type,
    showDropdown = false,
    onDeleteClick,
    onUpdateClick,
    getTags,
    onSetReactionClick,
    onDeleteReactionClick
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

  const handleSaveClick = (e) => {
    e.preventDefault();
    setEditMode(false);
    setTagsForDropdown([]);
    onUpdateClick(id, textValue, currentTags);
  }

  const getTagsForDropdown = (name) => {
    getTags(name).then(
      tags => {
        setTagsForDropdown(tags.data)
      }
    );
  }

  const handleReactionClick = (reactionType) => {
    if (reactionType) {
      liked ? onDeleteReactionClick(id) : onSetReactionClick(id, true);
    } else {
      (liked === false) ? onDeleteReactionClick(id) : onSetReactionClick(id, false);
    }
  }

  return (
    <div className="entity w-100 py-3 px-4">
      <div className="row">
        <div className="post-img col-1">
          {avatar
            ?
            <Link to={ROUTES.USERS + `/${user_id}`}>
              <img src={avatar} onError={handleImageError} alt={login} className="img-fluid rounded-circle"/>
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
                    <div className="dropdown-div ml-auto">
                      <button
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        className="rounded-circle border-0 p-0"
                      >
                        &#8250;
                      </button>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <span className="dropdown-item" onClick={() => setEditMode(!editMode)}>{editMode ? "Cancel" : 'Edit'}</span>
                        <span className="dropdown-item" onClick={() => onDeleteClick(id)}>Delete</span>
                      </div>
                    </div>
                    : null}
                </>
                : <Skeleton height={20} width={250}/>
              }
            </div>
            {editMode
              ?
              <EntityFields
                onTextChange={setTextValue}
                onSubmitClick={handleSaveClick}
                setTags={setTags}
                getDropdownTags={getTagsForDropdown}
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
                  <div className="col-lg-12 post-current-tags mt-3">
                    {currentTags.map((tag, i) =>
                      <span key={`tag ${i}`} className="tag py-2 px-3 mr-2">
                        {tag.name}
                      </span>
                    )}
                  </div>
                }
                <div className="col-lg-12 post-buttons mt-4 row">
                  <div className="col-lg-4">
                    <IconWithCount
                      icon={faThumbsUp}
                      handleClick={() => handleReactionClick(true)}
                      count={likes_count}
                      styles={"up-span " + (liked === true ? "liked" : "")}
                    />
                  </div>
                  <div className="col-lg-4">
                    <IconWithCount
                      icon={faThumbsDown}
                      handleClick={() => handleReactionClick(false)}
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
