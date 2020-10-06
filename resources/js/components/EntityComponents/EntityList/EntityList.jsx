import React from "react";
import './entityList.scss';
import ListEntity from "./ListEntity/ListEntity";

export const EntityList = (
  {
    entities,
    ...props
  }) => (
  <div className="user-posts w-100 p-0">
    {
      (entities || []).map(post => (<ListEntity
        key={post.id}
        data={post}
        {...props}
      />))
    }
  </div>
);
