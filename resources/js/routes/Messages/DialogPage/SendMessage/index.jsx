import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from '@fortawesome/free-regular-svg-icons';
import '@fortawesome/fontawesome-svg-core';
import './sendMessage.scss';

const SendMessage = ({sendMessageFunc}) => {
  const [textAreaValue, setTextAreaValue] = useState('');

  const handleClickSend = () => {
    // sendMessageFunc(textAreaValue);
    setTextAreaValue('');
  }

  const handleChangeText = (e) => {
    setTextAreaValue(e.target.value);
  }

  return (
    <div className="send-message row">
      <textarea
        onChange={handleChangeText}
        value={textAreaValue} placeholder={`Type message here...`}
        className="w-100"
        rows={1}
      />
      <span onClick={handleClickSend}>
        <FontAwesomeIcon icon={faPaperPlane}/>
      </span>
    </div>
  )
}

export default SendMessage;
