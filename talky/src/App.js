import NavBar from './components/NavBar';
import MainContainer from './components/MainContainer';
import CallContainer from './components/CallContainer';
import { Routes, Route } from 'react-router-dom';
import HomeContainer from './components/HomeContainer';
import './App.css';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Decentralized Peer-to-Peer Video Calling App | Aayush Sinha</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <NavBar />
      <MainContainer>
        <Routes>
          <Route path="/" element={<HomeContainer />}></Route>
          <Route path="/call/:call_id" element={<CallContainer />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </MainContainer>
    </>
  );
}

export default App;
