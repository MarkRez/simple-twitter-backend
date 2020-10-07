import React from "react";
import ListEntity from "./ListEntity/ListEntity";

export const EntitiesList = (
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
