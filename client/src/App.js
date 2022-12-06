import { Container } from '@material-ui/core';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { gapi } from 'gapi-script';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import PostDetails from './components/PostDetails/PostDetails';

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    function start() {
      gapi.client.init({
        clientId:
          '83373192730-6eom84nivja63u9qp3hrcpep69a3jjkn.apps.googleusercontent.com',
        scope: '',
      });
      gapi.load('client:auth2', start);
    }
  }, []);

  return (
    <BrowserRouter>
      <Container maxWidth='xl'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to='/posts' />} />
          <Route path='/posts' exact element={<Home />} />
          <Route path='/posts/search' exact element={<Home />} />
          <Route path='/posts/:id' exact element={<PostDetails />} />
          <Route
            path='/auth'
            element={!user ? <Auth /> : <Navigate to='/' />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
