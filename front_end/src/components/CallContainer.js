import React, { useState, useEffect } from 'react';
import { Card, Stack, Alert } from 'react-bootstrap';
import { getMediaStream } from '../functions/Call';
import CallBottomNav from './CallBottomNav';
import CallCanvas from './CallCanvas';
import ChatContainer from './ChatContainer';
import { provider } from '../functions/Web3';
import { ethers, utils } from 'ethers';
import { CONTRACT_ADDRESS, WEB3_CALL_REGEX } from '../constants';
import contractMetadata from '../contractMetadata';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNewPeerConnection, generateOffer } from '../functions/Call';
import { setPeerConnection } from '../actions';


const CallContainer = () => {
  const [isChatVisible, setChatVisible] = useState(false);
  const [alertDetails, setAlertDetails] = useState({});
  const [localStream, setLocalStream] = useState({});
  const [remoteStream, setRemoteStream] = useState({});
  const { callURL } = useParams();
  const navigate = useNavigate();
  const peerConnection = useSelector((state) => state.peerConnection);
  const [callURLForWeb3, setCallURLForWeb3] = useState("");
  const dispatch = useDispatch();
  const userAccount = useSelector((state) => state.wallet);

  useEffect(() => {
    if (!callURL.match(WEB3_CALL_REGEX)) {
      navigate('/');
    }
    const callURLComponents = callURL.split("-");
    const newCallURLForWeb3 = `${callURLComponents[1]}${callURLComponents[2]}${callURLComponents[3]}`.toLocaleLowerCase();
    setCallURLForWeb3(newCallURLForWeb3);
  }, [callURL, navigate]);

  useEffect(() => {
    (async () => {
      setAlertDetails({
        variant: "warning",
        text: "Joining Call..."
      });

      if (userAccount === undefined || callURLForWeb3 === "") {
        return;
      }
      if (peerConnection === undefined) {
        const newPeerConnection = getNewPeerConnection();
        dispatch(setPeerConnection(newPeerConnection));
        return;
      }

      console.log(peerConnection, userAccount, callURLForWeb3, dispatch);

      try {
        const filter = {
          address: CONTRACT_ADDRESS,
          topics: [
            // the name of the event, parnetheses containing the data type of each event, no spaces
            // utils.id("ICEUpdated(string)"),
            utils.id("callLogs(address, string)"),
          ]
        };
        provider.on(filter, (log, event) => {
          console.log(log);
          console.log(event);
          // do whatever you want here
          // I'm pretty sure this returns a promise, so don't forget to resolve it
          setRemoteStream(localStream);
        });

        const localStream = await getMediaStream();
        setLocalStream(localStream);

        setAlertDetails({
          variant: "warning",
          text: "Connecting to Bockchain..."
        });
        
        const contract = new ethers.Contract(CONTRACT_ADDRESS, contractMetadata.output.abi, provider);
        const contractWithSigner = contract.connect(userAccount);

        const callDetails = await contractWithSigner.getCallDetails(utils.toUtf8Bytes(callURLForWeb3));
        const gasPrice = await provider.getFeeData();
        console.log(callDetails);

        if(callDetails.initiator_addr === userAccount.address) {
          const offerDetails = await generateOffer(peerConnection);
          peerConnection.setLocalDescription(offerDetails);
          const transaction = await contractWithSigner.joinCall(utils.toUtf8Bytes(callURLForWeb3), offerDetails.sdp, offerDetails.type, { gasLimit: 350000, maxFeePerGas: gasPrice.maxFeePerGas.add(gasPrice.maxFeePerGas), maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas.add(gasPrice.maxPriorityFeePerGas) });
          console.log(transaction);

          const receipt = await transaction.wait();
          
          console.log(receipt);
        } else {
          peerConnection.setRemoteDescription(callDetails.offer_sdp);
          const answerDetails = await peerConnection.createAnswer();
          peerConnection.setLocalDescription(answerDetails);
          const transaction = await contractWithSigner.joinCall(utils.toUtf8Bytes(callURLForWeb3), answerDetails.sdp, answerDetails.type, { gasLimit: 350000, maxFeePerGas: gasPrice.maxFeePerGas.add(gasPrice.maxFeePerGas), maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas.add(gasPrice.maxPriorityFeePerGas) });
          console.log(transaction);

          const receipt = await transaction.wait();
          
          console.log(receipt);
        }

        setAlertDetails({
          variant: "success",
          text: "You are connected!"
        });

        

        peerConnection.onicecandidate = (event) => {
          (async () => {
            console.log(event.candidate.toJSON());
          })();
        }



      } catch (e) {
        console.log(e);
        setAlertDetails({
          variant: "danger",
          text: "Permissions denied, please try again"
        });
      }



      // dispatch(setPeerConnection(peerConnection));
      console.log(peerConnection);
    })();
  }, [peerConnection, userAccount, callURLForWeb3, dispatch]);

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