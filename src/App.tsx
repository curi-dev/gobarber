import React from 'react';

import GlobalStyle from './styles/global';

import SignIn from './pages/SignIn/index';
import SignUp from './pages/SignUp/index';

import { AuthProvider } from './context/AuthContext';

const App: React.FunctionComponent = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <GlobalStyle />
  </>
);

export default App;
