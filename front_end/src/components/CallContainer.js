import React, { useState, useEffect } from 'react';
import { Card, Stack, Alert } from 'react-bootstrap';
import { getMediaStream } from '../functions/Call';
import CallBottomNav from './CallBottomNav';
import CallCanvas from './CallCanvas';
import ChatContainer from './ChatContainer';


const CallContainer = () => {
  const [isChatVisible, setChatVisible] = useState(false);
  const [alertDetails, setAlertDetails] = useState({});
  const [localStream, setLocalStream] = useState({});
  const [remoteStream, setRemoteStream] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const localStream = await getMediaStream();
        setLocalStream(localStream);
        setRemoteStream(localStream);
      } catch (e) {
        setAlertDetails({
          variant: "danger",
          text: "Permissions denied, please try again"
        });
      }
    })();
  }, [])

  const toggleChatVisibility = () => {
    setChatVisible(chatVisibility => !chatVisibility);
  }

  return (
    <>
      <Stack direction="horizontal" style={{ alignItems: "stretch", overflowX: "hidden" }}>
        <div className={`mt-4 p-2 ${isChatVisible ? "col-md-10" : "col-md-12"}`} style={{ height: "calc(100vh - 8rem)", transition: "all 0.5s" }}>
          <Card style={{ height: "100%" }}>
            <Card.Body className='px-3'>
              {Object.keys(alertDetails).length > 0 ? (
                <Alert variant={alertDetails.variant} dismissible onClick={() => { setAlertDetails({}) }}>
                  {alertDetails.text}
                </Alert>
              ) : false}

              <CallCanvas localMediaStream={localStream} remoteMediaStream={remoteStream} style={{ height: Object.keys(alertDetails).length > 0 ? "calc(100% - 10.5rem)" : "calc(100% - 6rem)" }} />
              <CallBottomNav toggleChatVisibility={toggleChatVisibility} chatVisibility={isChatVisible} mediaStream={localStream} />
            </Card.Body>
          </Card>
        </div>
        <ChatContainer />
      </Stack>
    </>
  )
}

export default CallContainer