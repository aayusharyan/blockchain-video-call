import React, {useEffect, useState, useRef } from 'react';
import { Card, Navbar, Stack, InputGroup, Button, FormControl } from 'react-bootstrap';
import { collection, getDoc, setDoc, addDoc, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import ChatMessage from './ChatMessage';
import { useParams } from 'react-router-dom';
import { firestoreDB } from '../firebase';
import { useSelector } from 'react-redux';

const ChatContainer = () => {
  const { callURL } = useParams();
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const peerState = useSelector((state) => state.peerState);

  useEffect(() => {
    const callDoc = doc(firestoreDB, "calls", callURL);
    const chat = collection(callDoc, 'chat');
    onSnapshot(chat, snapshot => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          console.log("CALLED");
          setMessages((messages) => {
            return [...messages, change.doc.data()];
          });
        }
      });
    })
  }, []);

  const sendMessage = async() => {
    if(inputRef.current.value === "") {
      return;
    }
    const callDoc = doc(firestoreDB, "calls", callURL);
    const chat = collection(callDoc, 'chat');
    console.log(inputRef.current.value);
    const message = {
      data: inputRef.current.value,
      sender: peerState
    }
    await addDoc(chat, message);
    inputRef.current.value = "";
  }

  return (
    <>
      <div className="mt-4 col-md-2 p-2" style={{ height: "calc(100vh - 8rem)", transition: "all 0.5s" }}>
        <Card style={{height: "100%"}} className="p-1">
          <Navbar variant="light" bg="light">
            <h4 className='text-center mb-0' style={{ width: "100%" }}>Chat</h4>
          </Navbar>
          <Stack gap={4} className="mt-4 px-2 mb-4" style={{ overflowY: "auto" }}>
            {messages.filter((a, b) => a !== b, "").map((singleMessage, idx) => {
              const isReceived = singleMessage.sender === peerState;
              return (
                <ChatMessage received={isReceived} key={idx}>{singleMessage.data}</ChatMessage>
              )
            })}
          </Stack>
          <InputGroup className="mb-0">
            <FormControl
              className='ps-2'
              placeholder="Send a message..."
              aria-label="messagebox"
              aria-describedby="basic-addon2"
              ref={inputRef}
            />
            <Button variant="outline-primary" id="button-addon2" onClick={sendMessage} style={{ borderTopRightRadius: "0.25rem", borderBottomRightRadius: "0.25rem" }}>
              Send
            </Button>
          </InputGroup>
        </Card>
      </div>
    </>

  )
}

export default ChatContainer