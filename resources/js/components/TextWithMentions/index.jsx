import React from "react";
import {useHistory} from "react-router-dom";

const TextWithMentions = ({text, mentions}) => {
  const history = useHistory();
  let textWithMentions = '';

  const changePage = (e, id) => {
    e.preventDefault();
    history.push(`/users/${id}`)
  }

  if (text) {
    const reg = new RegExp(/(@(?:\w+[.]?\w+)+)/, 'g');
    const parts = text.split(reg);
    textWithMentions = parts.map((part, i) => {
      let mention = part.match(reg);
      if (mention) {
        if (mentions && mentions.length > 0) {
          for (let i = 0; i < mentions.length; i+=1) {
            if (mention[0].split('@')[1] === mentions[i].login) {
              return <span onClick={(e) => changePage(e, mentions[i].id)}>{mention}</span>;
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

export default TextWithMentions;
