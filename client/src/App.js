import React from 'react';
import { Route } from 'react-router-dom';
import  SignIn  from './component/Form/SignIn/SignIn';
import  SignUp  from './component/Form/SignUp/SignUp';
import  Dashboard  from './component/Dashboard/Dashboard';
import  Upload  from './component/Upload/upload'; 
import VideoPlayer from './component/VideoPlayer/videoPlayer';
import SignOut from './component/SignOut/signOut';
import myUploads from './component/MyUploads/myUploads';

function App() {
  return (
    <React.Fragment>
	  <Route exact path="/video/:videoTitle" component={VideoPlayer} />
      <Route exact path="/signIn" component={SignIn} />
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/myUploads" component={myUploads} />
      <Route exact path="/signUp" component={SignUp} />
      <Route exact path="/signOut" render={SignOut} />
      <Route exact path="/upload" component={Upload} />
    </React.Fragment>
  );
}

export default App;
