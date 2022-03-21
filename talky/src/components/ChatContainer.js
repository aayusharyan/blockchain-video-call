import React from 'react';
import { Card, Navbar, Stack, InputGroup, Button, FormControl } from 'react-bootstrap';
import ChatMessage from './ChatMessage';

const ChatContainer = () => {
  return (
    <>
      <div className="mt-4 col-md-2 p-2" style={{ height: "calc(100vh - 8rem)", transition: "all 0.5s" }}>
        <Card style={{height: "100%"}} className="p-1">
          <Navbar variant="light" bg="light">
            <h4 className='text-center mb-0' style={{ width: "100%" }}>Chat</h4>
          </Navbar>
          <Stack gap={4} className="mt-4 px-2 mb-4" style={{ overflowY: "auto" }}>
            {new Array(40).fill(1).map((_, idx) => {
              const isReceived = idx % 3 === 0;
              return (
                <ChatMessage received={isReceived} key={idx}>This message is sent by me</ChatMessage>
              )
            })}
          </Stack>
          <InputGroup className="mb-0">
            <FormControl
              className='ps-2'
              placeholder="Send a message..."
              aria-label="messagebox"
              aria-describedby="basic-addon2"
            />
            <Button variant="outline-primary" id="button-addon2" style={{ borderTopRightRadius: "0.25rem", borderBottomRightRadius: "0.25rem" }}>
              Send
            </Button>
          </InputGroup>
        </Card>
      </div>
    </>

  )
}

export default ChatContainer