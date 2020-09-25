import React from 'react';

const DialogPage = (props) => {
  const userId = props.computedMatch.params.id;

  return (
    <div className="dialog-page">
      <h2>Dialog with user (user_id: {userId})</h2>
    </div>
  );
}

export default DialogPage;
