import React, { useState, useEffect } from 'react';
import 'bootswatch/dist/morph/bootstrap.min.css';
import { Navbar, Container, Button, Tooltip, OverlayTrigger, Stack } from 'react-bootstrap';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { utils } from 'ethers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useWeb3React } from '@web3-react/core';
import { WALLET_COINBASE, WALLET_LEDGER, WALLET_METAMASK, WALLET_TREZOR, WALLET_WALLETCONNECT } from '../constants';
import { LedgerObj, MetaMaskObj, WalletConnectObj, WalletLinkObj } from '../functions/Web3';

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    <h5 className='mb-0'><strong>Add funds to wallet</strong></h5>
  </Tooltip>
);

const NavBar = () => {
  const { account, library, deactivate } = useWeb3React();
  const newAccount = useSelector((state) => state.wallet);
  const walletProvider = useSelector((state) => state.walletProvider);
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

  const logout = () => {
    switch(walletProvider) {
      case WALLET_METAMASK:
        deactivate(MetaMaskObj);
        break;
      case WALLET_WALLETCONNECT:
        deactivate(WalletConnectObj);
        break;
      case WALLET_COINBASE:
        deactivate(WalletLinkObj);
        break;
      case WALLET_LEDGER:
        deactivate(LedgerObj);
        break;
      case WALLET_TREZOR:
        break;
      default:
        break;
    }
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
              <strong>Talkie</strong>
            </h3>
          </Navbar.Brand>
        </Link>
        {newAccount !== undefined ? (
          <Stack direction='horizontal' gap={3}>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 50, hide: 400 }}
            overlay={renderTooltip}
          >
            <Button variant='outline-primary' onClick={loadWallet}>{balance} <FontAwesomeIcon icon={faEthereum} /></Button>
          </OverlayTrigger>
          <Button onClick={logout}>Logout <FontAwesomeIcon icon={faSignOutAlt} /></Button>
          </Stack>
        ) : false}
      </Container>
    </Navbar>
  )
}

export default NavBar;