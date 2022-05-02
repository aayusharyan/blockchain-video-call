import React, { useEffect, useState } from 'react';
import { getMediaDeviceList, getNewStream } from '../functions/Call';
import { Container, Navbar, Button, Stack, Dropdown, DropdownButton, ButtonGroup, Form } from 'react-bootstrap/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo, faMicrophone, faVolumeHigh, faMessage, faShareFromSquare, faPhone, faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

const CallBottomNav = (props) => {
  const navigate = useNavigate();
  const [audioInList, setAudioInList] = useState([]);
  const [audioInSrc, setAudioInSrc] = useState("");
  const [audioOutList, setAudioOutList] = useState([]);
  const [audioOutSrc, setAudioOutSrc] = useState("");
  const [videoInList, setVideoInList] = useState([]);
  const [videoInSrc, setVideoInSrc] = useState("")
  useEffect(() => {
    if (props.mediaStream.active !== undefined) {
      (async () => {
        const [audioInList, audioOutList, videoInList] = await getMediaDeviceList();

        setAudioInList(audioInList);
        setAudioOutList(audioOutList);
        setVideoInList(videoInList);

        if (props.mediaStream.getAudioTracks()?.length > 0) {
          const defaultAudioSrc = props.mediaStream.getAudioTracks()[0].getCapabilities().deviceId;
          setAudioInSrc(defaultAudioSrc);
        }
        if (props.mediaStream.getVideoTracks()?.length > 0) {
          const defaultVideoSrc = props.mediaStream.getVideoTracks()[0].getCapabilities().deviceId;
          setVideoInSrc(defaultVideoSrc);
        }

        setAudioOutSrc("")
      })()
    }
  }, [props.mediaStream]);

  const changeVideoInSrc = async (deviceId) => {
    const currentVideoTrack = props.mediaStream.getVideoTracks()[0];
    const tempStream = await getNewStream(deviceId);
    console.log(tempStream);
    const newVideoTrack = tempStream.getVideoTracks()[0];

    props.mediaStream.addTrack(newVideoTrack);
    currentVideoTrack.stop();
    props.mediaStream.removeTrack(currentVideoTrack);
    setVideoInSrc(deviceId);
    
    var sender = props.peerConnection.getSenders().find(function (s) {
      return s.track.kind == newVideoTrack.kind;
    });

    console.log('found sender:', sender);
    sender.replaceTrack(newVideoTrack);
  }

  const shareScreen = async() => {
    let tempStream = null;
    let options = { video: { cursor: "always" }, }
  
    try {
      tempStream = await navigator.mediaDevices.getDisplayMedia(options);
    } catch (err) {
      console.error("Error: " + err);
      return;
    }
  
    let currentVideoTrack = props.mediaStream.getVideoTracks()[0];
    let newVideoTrack = tempStream.getVideoTracks()[0];
  
    props.mediaStream.addTrack(newVideoTrack);
    currentVideoTrack.stop();
    props.mediaStream.removeTrack(currentVideoTrack);
    
    var sender = props.peerConnection.getSenders().find(function (s) {
      return s.track.kind == newVideoTrack.kind;
    });

    console.log('found sender:', sender);
    sender.replaceTrack(newVideoTrack);
  }

  const endCall = () => {
    props.mediaStream.getTracks().forEach(function(track) {
      track.stop();
    });
    props.peerConnection.close();
    navigate("/");
  }

  const fullScreen = () => {
    document.body.requestFullscreen();
  }

  return (
    <Container fluid>
      <Navbar expand="lg" variant="light" bg="light" style={{ borderRadius: "1rem" }}>
        <Stack direction="horizontal" className="col-md-12">
          <Stack direction="horizontal" gap={3} className="col-md-4 ps-4 py-2">
            <ButtonGroup>
              <Button>
                <FontAwesomeIcon icon={faVideo} />
              </Button>
              <DropdownButton
                as={ButtonGroup}
                drop="up"
                variant="secondary"
                title=""
              >
                {videoInList.map((singleVideoIn, idx) => {
                  return (
                    <Dropdown.Item key={idx} active={singleVideoIn.deviceId === videoInSrc} onClick={() => { changeVideoInSrc(singleVideoIn.deviceId) }}>{singleVideoIn.label}</Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </ButtonGroup>
            <ButtonGroup>
              <Button>
                <FontAwesomeIcon icon={faMicrophone} />
              </Button>
              <DropdownButton
                as={ButtonGroup}
                drop="up"
                variant="secondary"
                title=""
              >
                {audioInList.map((singleAudioIn, idx) => {
                  return (
                    <Dropdown.Item key={idx} active={singleAudioIn.deviceId === audioInSrc}>{singleAudioIn.label}</Dropdown.Item>
                  );
                })}
                <Dropdown.Divider />
                <Form.Range className='px-3' />
              </DropdownButton>
            </ButtonGroup>
            <ButtonGroup>
              <Button>
                <FontAwesomeIcon icon={faVolumeHigh} />
              </Button>
              <DropdownButton
                as={ButtonGroup}
                drop="up"
                variant="secondary"
                title=""
              >
                {audioOutList.map((singleAudioOut, idx) => {
                  return (
                    <Dropdown.Item key={idx} active={singleAudioOut.deviceId === audioOutSrc}>{singleAudioOut.label}</Dropdown.Item>
                  );
                })}
                <Dropdown.Divider />
                <Form.Range className='px-3' />
              </DropdownButton>
            </ButtonGroup>
          </Stack>
          <Button variant="outline-danger" className='col-md-4' onClick={endCall}>End Call &nbsp; &nbsp; <FontAwesomeIcon icon={faPhone} style={{transform: "rotate(135deg)"}} /></Button>
          <Stack direction='horizontal' className='col-md-4 pe-4' gap={3}>
            <Button className="ms-auto" onClick={fullScreen}>
              <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
            </Button>
            <Button onClick={shareScreen}>
              <FontAwesomeIcon icon={faShareFromSquare} />
            </Button>
            <Button variant={(props.chatVisibility ? 'outline-primary' : '')} onClick={props.toggleChatVisibility}>
              <FontAwesomeIcon icon={faMessage} />
            </Button>
          </Stack>
        </Stack>

      </Navbar>
    </Container>
  )
}

export default CallBottomNav