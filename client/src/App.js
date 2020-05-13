import React from 'react';
import { Route } from 'react-router-dom';
import  SignIn  from './component/Form/SignIn/SignIn';
import  SignUp  from './component/Form/SignUp/SignUp';
import  Upload  from './component/Upload/upload'; 

function App() {
  return (
    <React.Fragment>
      <Route exact path="/signIn" component={SignIn} />
      <Route exact path="/signUp" component={SignUp} />
      <Route exact path="/upload" component={Upload} />
    </React.Fragment>
  );
}

export default App;
