import React from "react";
import './entityList.scss';
import ListEntity from "../ListEntity";

const EntityList = (
  {
    entities,
    ...props
  }) => {
  let List = [];

  if (entities) {
    List = entities.map(post => {
      return (
        <ListEntity
          key={post.id}
          data={post}
          {...props}
        />
      )
    });
  }

  return (
    <div className="user-posts w-100 p-0">
      {List}
    </div>
  )
}

export default EntityList;
