import React, { useEffect, useState } from 'react';
import { Button, Container, Stack, Col, Navbar } from 'react-bootstrap';
import checkingWeb3Img from '../assets/checking_web3.png';
import invalidChain from '../assets/invalid_chain.png';
import ready from '../assets/ready.png';
import gridSection from '../assets/grid_section.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot, faPlus, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useWeb3React } from '@web3-react/core';
import { LedgerObj, MetaMaskObj, WalletConnectObj, WalletLinkObj } from '../functions/Web3';
import { LOGIN_STATE_INVALID_CHAIN, LOGIN_STATE_LOGIN_SUCCESS, LOGIN_STATE_NO_LOGIN, ROPSTEN_CHAIN_ID, ROPSTEN_CHAIN_ID_HEX } from '../constants';
import JoinCallModal from './JoinCallModal';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const HomeContainer = () => {
  const [ loginState, setLoginState ] = useState(LOGIN_STATE_NO_LOGIN);
  const { active, activate, chainId, error, account } = useWeb3React();
  const [ joinCallModalShow, setJoinCallModalShow ] = useState(false);
  const [ userAccount, setUserAccount ] = useState("");
  const [ currentTime, setCurrentTime ] = useState(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    if (error !== undefined) {
      if (error.name === "UnsupportedChainIdError") {
        setLoginState(LOGIN_STATE_INVALID_CHAIN);
      }
    }
    if (active) {
      if (chainId === ROPSTEN_CHAIN_ID) {
        setLoginState(LOGIN_STATE_LOGIN_SUCCESS);
      } else {
        setLoginState(LOGIN_STATE_INVALID_CHAIN);
      }
    }
  }, [active, chainId, error]);
  
  useEffect(() => {
    if(account === undefined) {
      setLoginState(LOGIN_STATE_NO_LOGIN);
      setUserAccount("");
    } else {
      setUserAccount(account);
    }
  }, [account]);

  useEffect(() => {
    setTimeout(() => {
      setCurrentTime(Date.now());
    }, 50 * 1000);
  }, [currentTime]);

  console.log(useWeb3React());
  const connectToMetamask = () => {
    (async () => {
      try {
        await activate(MetaMaskObj);
      } catch (e) {
        console.log(e);
      }
    })();
  }

  const connectToWalletConnect = () => {
    (async () => {
      try {
        await activate(WalletConnectObj);
      } catch (e) {
        console.log(e);
      }
    })();
  }

  const connectToWalletLink = () => {
    (async () => {
      try {
        await activate(WalletLinkObj);
      } catch (e) {
        console.log(e);
      }
    })();
  }

  const connectToLedger = () => {
    (async () => {
      try {
        await activate(LedgerObj);
      } catch (e) {
        console.log(e);
      }
    })();
  }

  const switchNetworkToRopsten = () => {
    (async () => {
      const provider = await MetaMaskObj.getProvider();
      provider.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: ROPSTEN_CHAIN_ID_HEX,
          },
        ],
      });
    })();
  }

  const joinCall = () => {
    setJoinCallModalShow(true);
  }

  const newCall = () => {
    navigate('/call/abcd');
  }

  const getLeftSide = () => {
    switch (loginState) {
      case LOGIN_STATE_NO_LOGIN:
        return (
          <>
            <h1>Checking web3 connectivity...</h1>
            <h6 className='mb-5'>A.K.A. Blockchain</h6>
            <h3>Select your Provider</h3>
            <Stack direction='horizontal' gap={4} className='mt-5'>
              <Button variant="outline-warning" onClick={connectToMetamask}>Metamask</Button>
              <Button variant="outline-primary" onClick={connectToWalletConnect}>WalletConnect</Button>
              <Button variant="outline-dark" onClick={connectToWalletLink}>Coinbase</Button>
              <Button variant="outline-dark" onClick={connectToLedger}>Ledger</Button>
              <Button variant="outline-dark" onClick={connectToWalletLink}>Trezor</Button>
            </Stack>
          </>
        );
      case LOGIN_STATE_LOGIN_SUCCESS:
        return (
          <>
            <h1>Welcome, {userAccount.substring(0, 5)} ··· {userAccount.substring(userAccount.length - 6, userAccount.length)}</h1>
            <h4 className='mb-5'>Have peace of mind, it's secure.</h4>
            <h3>It's <strong className='display-6'>{getCurrentTime()}</strong> currently.</h3>
            <Stack direction='horizontal' gap={4} className='mt-5'>
              <Button variant="primary" onClick={newCall}>New Call &emsp; <FontAwesomeIcon icon={faPlus} /></Button>
              <Button variant="primary" onClick={joinCall}>Join Call &emsp; <FontAwesomeIcon icon={faPhone} /></Button>
            </Stack>
          </>
        );
      case LOGIN_STATE_INVALID_CHAIN:
        return (
          <>
            <h1>Good... One last step</h1>
            <h2 className='pb-5'>We need Ropsten Chain to work</h2>
            <Stack direction='horizontal' gap={4} className='mt-5'>
              <Button variant="outline-primary" onClick={switchNetworkToRopsten}>Switch Network</Button>
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
      case LOGIN_STATE_INVALID_CHAIN:
        return (
          <>
            <div style={{ backgroundColor: "#FFFFFF", borderRadius: "50%", width: "30rem", height: "30rem", boxShadow: "0px 0px 20px white", float: "right" }}>
              <img src={invalidChain} style={{ width: "30rem", position: "relative", borderBottomLeftRadius: "15rem", borderBottomRightRadius: "15rem", zIndex: "2001" }} alt="" />
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
        <span>{momentObj.hour()}</span>
        :
        <span>{momentObj.minute()}</span>
      </>
    );
  }

  return (
    <>
      <JoinCallModal show={joinCallModalShow} onHide={() => {setJoinCallModalShow(false)}} />
      <Container className='mt-5 pt-5'>
        <Stack direction='horizontal' className='mt-3' >
          <Col md="6" className='mt-5'>
            {getLeftSide()}
          </Col>
          <Col md="6" className='mt-5'>
            {getRightSide()}
          </Col>

        </Stack>
        <Navbar expand="lg" fixed="bottom">
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