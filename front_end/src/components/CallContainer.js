import React, { useState, useEffect } from 'react';
import { Card, Stack, Alert } from 'react-bootstrap';
import { getMediaStream } from '../functions/Call';
import CallBottomNav from './CallBottomNav';
import CallCanvas from './CallCanvas';
import ChatContainer from './ChatContainer';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNewPeerConnection } from '../functions/Call';
import { setPeerConnection } from '../actions';
import { PEER_STATE_INITIATOR } from '../constants';
import { firestoreDB } from '../firebase';
import { collection, getDoc, setDoc, addDoc, updateDoc, doc, onSnapshot } from 'firebase/firestore';


const CallContainer = () => {
  const [isChatVisible, setChatVisible] = useState(false);
  const [alertDetails, setAlertDetails] = useState({});
  const [localStream, setLocalStream] = useState({});
  const [remoteStream, setRemoteStream] = useState({});
  const peerConnection = useSelector((state) => state.peerConnection);
  const dispatch = useDispatch();
  const peerState = useSelector((state) => state.peerState);
  const { callURL } = useParams();
  const [PCState, setPCState] = useState(0);

  useEffect(() => {
    const fn = async () => {
      setPCState(1);
      setAlertDetails({
        variant: "warning",
        text: "Joining Call..."
      });

      const peerConnection = getNewPeerConnection();
      dispatch(setPeerConnection(peerConnection));
      
      const localStream  = await getMediaStream();
      const remoteStream = new MediaStream();
      setLocalStream(localStream);
      setRemoteStream(remoteStream);

      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });

      peerConnection.ontrack = event => {
        event.streams[0].getTracks().forEach(track => {
            remoteStream.addTrack(track);
        });
      };

      if(peerState === PEER_STATE_INITIATOR) {
        // Create offer
        const offerDescription = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offerDescription);
      
        const offer = {
          sdp: offerDescription.sdp,
          type: offerDescription.type,
        };
        
        await setDoc(doc(firestoreDB, "calls", callURL), { offer });
        const callDoc = doc(firestoreDB, "calls", callURL);

        const offerCandidates   = collection(callDoc, 'offerCandidates');
        const answerCandidates  = collection(callDoc, 'answerCandidates');

        console.log(offerCandidates);

        // Get candidates for caller, save to db
        peerConnection.onicecandidate = event => {
          if(event.candidate) {
            (async (event) => {
              console.log("WILL WRITE!!!!!");
              console.log(event.candidate.toJSON());
              const newDoc = await addDoc(offerCandidates, event.candidate.toJSON());
              console.log(newDoc.id);
              console.log("667");
            })(event);
          }
        };
      
        // Listen for remote answer
        onSnapshot(callDoc, (snapshot) => {
          const data = snapshot.data();
          if (!peerConnection.currentRemoteDescription && data?.answer) {
            const answerDescription = new RTCSessionDescription(data.answer);
            peerConnection.setRemoteDescription(answerDescription);
          }
        });
      
        // Listen for remote ICE candidates
        onSnapshot(answerCandidates, snapshot => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
              const candidate = new RTCIceCandidate(change.doc.data());
              peerConnection.addIceCandidate(candidate);
            }
          });
        });
      } else {
        const callDoc           = doc(firestoreDB, 'calls', callURL);
        const offerCandidates   = collection(callDoc, 'offerCandidates');
        const answerCandidates  = collection(callDoc, 'answerCandidates');

        peerConnection.onicecandidate = event => {
          if(event.candidate) {
            (async (event) => {
              await addDoc(answerCandidates, event.candidate.toJSON());
            })(event);
          }
        };
      
        // Fetch data, then set the offer & answer
      
        const callData = (await getDoc(callDoc)).data();
      
        const offerDescription = callData.offer;
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offerDescription));
      
        const answerDescription = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answerDescription);
      
        const answer = {
          type: answerDescription.type,
          sdp: answerDescription.sdp,
        };
      
        await updateDoc(callDoc, { answer });
      
        // Listen to offer candidates
      
        onSnapshot(offerCandidates, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            console.log(change)
            if (change.type === 'added') {
              let data = change.doc.data();
              peerConnection.addIceCandidate(new RTCIceCandidate(data));
            }
          });
        });
      }

      // console.log(peerConnection);
      // if(peerConnection.signalingState === "stable") {
      //   return;
      // }

      setAlertDetails({
        variant: "success",
        text: "You are connected!"
      });

      setTimeout(() => {
        setAlertDetails({});
      }, (1000));

      console.log(peerConnection);
    }

    if(PCState !== 1) {
      console.log(PCState);
      fn();
    }
  }, [peerConnection, peerState, dispatch, callURL, PCState]);

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
                <Alert variant={alertDetails.variant} dismissible onClose={() => { setAlertDetails({}) }}>
                  {alertDetails.text}
                </Alert>
              ) : false}

              <CallCanvas localMediaStream={localStream} remoteMediaStream={remoteStream} style={{ height: Object.keys(alertDetails).length > 0 ? "calc(100% - 10.5rem)" : "calc(100% - 6rem)" }} />
              <CallBottomNav toggleChatVisibility={toggleChatVisibility} chatVisibility={isChatVisible} mediaStream={localStream} peerConnection={peerConnection} />
            </Card.Body>
          </Card>
        </div>
        <ChatContainer />
      </Stack>
    </>
  )
}

export default CallContainer