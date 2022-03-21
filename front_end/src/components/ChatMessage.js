import React from 'react';
import { Card } from 'react-bootstrap';

const ChatMessage = (props) => {
  return (
    <Card className='p-2 px-3' bg={props.received ? 'primary' : 'light'} text="dark" style={{ maxWidth: "70%", alignSelf: props.received ? "flex-end" : "flex-start" }}>
      <p className='mb-0'>{props.children}</p>
    </Card>
  )
}

export default ChatMessage