import React, { useRef, useEffect } from 'react'
import { Container, Stack } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

const CallCanvas = (props) => {
  const primaryVideoRef = useRef(null);
  const secondaryVideoRef = useRef(null);
  const videoSwapIconRef = useRef(null);

  useEffect(() => {
    if (props.remoteMediaStream.id !== undefined) {
      console.log("RE-RUN");
      console.log(props.remoteMediaStream.getTracks());
      primaryVideoRef.current.srcObject = props.remoteMediaStream;
    }
  }, [props.remoteMediaStream]);

  useEffect(() => {
    if (props.localMediaStream.id !== undefined) {
      console.log("LOCAL", props.localMediaStream.getTracks());
      secondaryVideoRef.current.srcObject = props.localMediaStream;
    }
  }, [props.localMediaStream]);

  const swapVideoFeeds = () => {
    primaryVideoRef.current.style.opacity = "0";
    secondaryVideoRef.current.style.opacity = "0";
    primaryVideoRef.current.style.transform = "scale(0.9)";
    secondaryVideoRef.current.style.transform = "scale(0.9)";
    primaryVideoRef.current.style.filter = "blur(10px)";
    secondaryVideoRef.current.style.filter = "blur(10px)";
    videoSwapIconRef.current.style.opacity = "0";

    setTimeout(() => {
      const temp = primaryVideoRef.current.srcObject;
      primaryVideoRef.current.srcObject = secondaryVideoRef.current.srcObject;
      secondaryVideoRef.current.srcObject = temp;
      primaryVideoRef.current.style.transform = "";
      secondaryVideoRef.current.style.transform = "";
      primaryVideoRef.current.style.filter = "";
      secondaryVideoRef.current.style.filter = "";
      primaryVideoRef.current.style.opacity = "1";
      secondaryVideoRef.current.style.opacity = "1";
      videoSwapIconRef.current.style.opacity = "1";
    }, 500)
  }

  const metadataLoaded = (e) => {
    e.target.play();
  }
  return (
    <>
      <Container fluid style={{ ...props.style }} className="pt-0 mb-3 text-center">
        <Container className='bg-dark p-0' fluid style={{ height: "100%", borderRadius: "1rem", position: "relative" }}>
          <video muted ref={primaryVideoRef} onLoadedMetadata={metadataLoaded} style={{ height: "100%", maxWidth: "100%", transition: "all 0.5s" }} />
          <div className='p-0 secondaryVideoContainer' style={{ position: "absolute", bottom: "1rem", right: "1rem", borderRadius: "1rem", maxWidth: "33%", overflow: "hidden", transition: "all 0.25s" }}>
            <Stack style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%", transition: "all 0.25s", opacity: "0", background: "rgba(0,0,0,0)" }} className="justify-content-center swapIconContainer" onClick={swapVideoFeeds}>
              <span ref={videoSwapIconRef} style={{ transition: "all 0.25s", transitionDelay: "0.25s" }}><FontAwesomeIcon icon={faArrowsRotate} className="fs-1 text-light" /></span>
            </Stack>
            <video muted ref={secondaryVideoRef} onLoadedMetadata={metadataLoaded} style={{ transition: "all 0.5s", width: "100%" }} />
          </div>
        </Container>
      </Container>
    </>
  )
}

export default CallCanvas