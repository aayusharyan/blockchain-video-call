import React, { useEffect, useState } from 'react';
import { Button, Container, Stack, Col, Navbar } from 'react-bootstrap';
import checkingWeb3Img from '../assets/checking_web3.png';
import ready from '../assets/ready.png';
import gridSection from '../assets/grid_section.png';
import metamaskLogo from '../assets/metamask.png';
import walletConnectLogo from '../assets/walletconnect.ico';
import coinbaseLogo from '../assets/coinbase.png';
import ledgerLogo from '../assets/ledger.png';
import trezorLogo from '../assets/trezor.png';
import firebaseLogo from '../assets/firebase.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot, faPlus, faPhone } from '@fortawesome/free-solid-svg-icons';
import { LOGIN_STATE_LOGIN_SUCCESS, LOGIN_STATE_NO_LOGIN, JOIN_STATUS_MAKING_CONNECTION, JOIN_STATUS_GENERATING_TRANSACTION, JOIN_STATUS_WAITING_FOR_MINT, JOIN_STATUS_REDIRECTING, PEER_STATE_INITIATOR, CALL_URL_PREPEND_TEXT } from '../constants';
import JoinCallModal from './JoinCallModal';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import JoiningCallModal from './JoiningCallModal';
import { useDispatch } from 'react-redux';
import { setPeerState } from '../actions.js';
import { makeId } from '../functions/Call';

const HomeContainer = () => {
  const [loginState, setLoginState] = useState(LOGIN_STATE_NO_LOGIN);
  const [joinCallModalShow, setJoinCallModalShow] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [joiningCallModal, setJoiningCallModal] = useState(false);
  const [joiningCallModalStatus, setJoiningCallModalStatus] = useState(JOIN_STATUS_MAKING_CONNECTION);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setCurrentTime(Date.now());
    }, 50 * 1000);
  }, [currentTime]);

  const login = () => {
    setLoginState(LOGIN_STATE_LOGIN_SUCCESS);
  }

  const joinCall = () => {
    setJoinCallModalShow(true);
  }

  const newCall = () => {
    setJoiningCallModal(true);
    (async _ => {
      try {
        setJoiningCallModalStatus(JOIN_STATUS_GENERATING_TRANSACTION);
        setJoiningCallModalStatus(JOIN_STATUS_WAITING_FOR_MINT);

        const parts = [];
        parts.push(CALL_URL_PREPEND_TEXT);
        parts.push(makeId(3));
        parts.push(makeId(3));
        parts.push(makeId(3));


        setJoiningCallModalStatus(JOIN_STATUS_REDIRECTING);
        dispatch(setPeerState(PEER_STATE_INITIATOR));

        setTimeout(() => {
          const url = parts.join("-");
          navigate(`/call/${url}`);
        }, 1500)
      } catch (e) {
        console.log(e);
      }
    })();
  }

  const getLeftSide = () => {
    switch (loginState) {
      case LOGIN_STATE_NO_LOGIN:
        return (
          <>
            <h1>Select your Wallet</h1>
            <Stack direction='horizontal' gap={4} className='mt-5'>
              <Button variant="outline-light" style={{ display: "inherit", verticalAlign: "middle" }} disabled>
                <h5 className='mb-0 text-dark' style={{ lineHeight: "2rem" }}>Metamask</h5> &emsp;
                <img src={metamaskLogo} alt="" style={{ height: "2rem" }} />
              </Button>
              <Button variant="outline-light" style={{ display: "inherit", verticalAlign: "middle" }} disabled>
                <h5 className='mb-0 text-dark' style={{ lineHeight: "2rem" }}>WalletConnect</h5> &emsp;
                <img src={walletConnectLogo} alt="" style={{ height: "2rem" }} />
              </Button>
              <Button variant="outline-light" style={{ display: "inherit", verticalAlign: "middle" }} disabled>
                <h5 className='mb-0 text-dark' style={{ lineHeight: "2rem" }}>Coinbase</h5> &emsp;
                <img src={coinbaseLogo} alt="" style={{ height: "2rem" }} />
              </Button>
            </Stack>
            <Stack direction='horizontal' gap={4} className='mt-5'>
              <Button variant="outline-light" style={{ display: "inherit", verticalAlign: "middle" }} disabled>
                <h5 className='mb-0 text-dark' style={{ lineHeight: "2rem" }}>Ledger</h5> &emsp;
                <img src={ledgerLogo} alt="" style={{ height: "2rem" }} />
              </Button>
              <Button variant="outline-light" style={{ display: "inherit", verticalAlign: "middle" }} disabled>
                <h5 className='mb-0 text-dark' style={{ lineHeight: "2rem" }}>Trezor</h5> &emsp;
                <img src={trezorLogo} alt="" style={{ height: "2rem" }} />
              </Button>
              <Button variant="outline-light" onClick={login} style={{ display: "inherit", verticalAlign: "middle" }}>
                <h5 className='mb-0 text-dark' style={{ lineHeight: "2rem" }}>Firebase</h5> &emsp;
                <img src={firebaseLogo} alt="" style={{ height: "2rem" }} />
              </Button>
            </Stack>
          </>
        );
      case LOGIN_STATE_LOGIN_SUCCESS:
        return (
          <>
            <h1>Welcome, ··· </h1>
            <h4 className='mb-5'>Have peace of mind, it's secure.</h4>
            <h3>It's <strong className='display-6'>{getCurrentTime()}</strong> currently.</h3>
            <Stack direction='horizontal' gap={4} className='mt-5'>
              <Button variant="primary" onClick={newCall}>New Call &emsp; <FontAwesomeIcon icon={faPlus} /></Button>
              <Button variant="primary" onClick={joinCall}>Join Call &emsp; <FontAwesomeIcon icon={faPhone} /></Button>
            </Stack>
          </>
        );
      default:
        return false;
    }
  }

  const getRightSide = () => {
    switch (loginState) {
      case LOGIN_STATE_NO_LOGIN:
        return (
          <>
            <div style={{ backgroundColor: "#FFFFFF", borderRadius: "50%", width: "30rem", height: "30rem", boxShadow: "0px 0px 20px white", float: "right" }}>
              <img src={checkingWeb3Img} style={{ width: "30rem", position: "relative", bottom: "2rem", borderBottomLeftRadius: "15rem", borderBottomRightRadius: "15rem", zIndex: "2001" }} alt="" />
            </div>
          </>
        );
      case LOGIN_STATE_LOGIN_SUCCESS:
        return (
          <>
            <div style={{ backgroundColor: "#FFFFFF", borderRadius: "50%", width: "30rem", height: "30rem", boxShadow: "0px 0px 20px white", float: "right" }}>
              <img src={ready} style={{ width: "30rem", position: "relative", bottom: "3rem", zIndex: "2001", animation: "MoveUpDown 4s linear infinite", willChange: "bottom" }} alt="" />
            </div>
          </>
        );
      default:
        return false;
    }
  }

  const getCurrentTime = () => {
    const momentObj = moment(currentTime);
    return (
      <>
        <span>{(momentObj.hour() < 10) ? `0${momentObj.hour()}` : momentObj.hour()}</span>
        :
        <span>{(momentObj.minute() < 10) ? `0${momentObj.minute()}` : momentObj.minute()}</span>
      </>
    );
  }

  return (
    <>
      <JoinCallModal show={joinCallModalShow} onHide={() => setJoinCallModalShow(false)} />
      <JoiningCallModal show={joiningCallModal} onHide={() => setJoiningCallModal(false)} status={joiningCallModalStatus} />
      <Container>
        <Container style={{ position: "fixed", top: "50vh", transform: "translateY(-50%)", display: "initial" }}>
          <Stack direction='horizontal' >
            <Col md="6">
              {getLeftSide()}
            </Col>
            <Col md="6">
              {getRightSide()}
            </Col>

          </Stack>
        </Container>
        <Navbar expand="lg" fixed="bottom" style={{ zIndex: "-5" }}>
          <img src={gridSection} style={{ width: "100%", height: "12rem", position: "absolute", bottom: "0rem", zIndex: "-5" }} alt="" />
          <Container fluid className="justify-content-center">
            <h4>Developed with <FontAwesomeIcon icon={faMugHot} /> by <a href='https://yush.dev' rel="noreferrer" target="_blank">Aayush Sinha</a></h4>
          </Container>
        </Navbar>
      </Container>
    </>
  )
}

export default HomeContainer