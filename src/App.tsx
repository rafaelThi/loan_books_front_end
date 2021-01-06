import React from 'react';
import Routes from './routes/routes';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from './styles/global'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <GlobalStyles/>
   </>
  );
}

export default App;
