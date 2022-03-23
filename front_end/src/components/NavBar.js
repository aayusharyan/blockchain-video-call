import React, { useState, useEffect } from 'react';
import 'bootswatch/dist/morph/bootstrap.min.css';
import { Navbar, Container, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { utils } from 'ethers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { useWeb3React } from '@web3-react/core';

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    <h5 className='mb-0'><strong>Add funds to wallet</strong></h5>
  </Tooltip>
);

const NavBar = () => {
  const { account, library } = useWeb3React();
  const newAccount = useSelector((state) => state.wallet);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    (async () => {
      if (newAccount !== undefined) {
        console.log(newAccount);
        const balance = await newAccount.getBalance();
        const ethBalance = utils.formatEther(balance);
        setBalance(ethBalance);
      }
    })();
  }, [newAccount]);

  const loadWallet = () => {
    library.eth.sendTransaction({from: account, to: newAccount.address, value: 100000000000000000});
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid className='mx-4 p-3'>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Navbar.Brand>
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            <h3 style={{ display: "inline" }}>
              <strong>Decentralized Peer-to-Peer Video Calling App</strong>
            </h3>
          </Navbar.Brand>
        </Link>
        {newAccount !== undefined ? (
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 50, hide: 400 }}
            overlay={renderTooltip}
          >
            <Button variant='outline-primary' onClick={loadWallet}>{balance} <FontAwesomeIcon icon={faEthereum} /></Button>
          </OverlayTrigger>
        ) : false}
      </Container>
    </Navbar>
  )
}

export default NavBar;