export const reactionToPostRequest = (id, payload) => ({
    url: `/posts/${id}/like`,
    method: 'post',
    data: payload
  }
);

export const deleteReactionFromPostRequest = (id) => ({
    url: `/posts/${id}/like`,
    method: 'delete',
  }
);
