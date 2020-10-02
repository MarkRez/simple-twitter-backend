import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from '@fortawesome/free-regular-svg-icons';
import '@fortawesome/fontawesome-svg-core';
import './sendMessage.scss';

const SendMessage = ({ onSubmitClick }) => {
  const [textAreaValue, setTextAreaValue] = useState('');

  const handleClickSend = () => {
    onSubmitClick(textAreaValue);
    setTextAreaValue('');
  }

  const handleChangeText = (e) => {
    setTextAreaValue(e.target.value);
  }

  return (
    <div className="send-message position-relative row">
      <textarea
        onChange={handleChangeText}
        value={textAreaValue} placeholder={`Type message here...`}
        className="w-100 overflow-auto"
        rows={1}
      />
      <span className="position-absolute rounded-circle pl-2" onClick={handleClickSend}>
        <FontAwesomeIcon icon={faPaperPlane}/>
      </span>
    </div>
  )
}

export default SendMessage;
