import React from "react";
import {useHistory} from "react-router-dom";

export const TextWithMentions = ({text, mentions}) => {
  const history = useHistory();
  let textWithMentions = '';

  if (text) {
    const reg = new RegExp(/(@(?:\w+[.]?\w+)+)/, 'g');
    const parts = text.split(reg);
    textWithMentions = parts.map((part, index) => {
      let mention = part.match(reg);
      if (mention) {
        if (mentions && mentions.length > 0) {
          for (let i = 0; i < mentions.length; i+=1) {
            if (mention[0].split('@')[1] === mentions[i].login) {
              return <span
                key={`mention ${index}`}
                onClick={() => history.push(`/users/${mentions[i].id}`)}
              >
                {mention}
              </span>;
            }
          }
        }
      }
      return part;
    })
  }

  return (
    <>
      {textWithMentions}
    </>
  )
}
