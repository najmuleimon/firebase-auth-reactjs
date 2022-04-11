import './App.css';
import google from './images/google.png'
import github from './images/github.png'
import facebook from './images/facebook.png'
import app from './firebase.init';
import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const user = result.user;
      setUser(user)
      console.log(user);
    })
    .catch(error => {
      console.log(error);
    })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
    .then(result => {
      const user = result.user;
      setUser(user)
      console.log(user);
    })
    .catch(error => {
      console.log(error);
    })
  }

  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
    .then(result => {
      const user = result.user;
      setUser(user);
      console.log(user);
    })
    .catch(error => {
      console.log(error);
    })
  }

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      setUser({})
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <div className='myApp'>
      <h1>Sign In</h1>
      {
      user.uid ? 
        <button onClick={handleSignOut} className="signout">Sign Out</button> :
        <>
          <button onClick={handleGoogleSignIn} className="signin">
            <img src={google} alt="" />
            Sign In with Google
          </button>
          <button onClick={handleGithubSignIn} className="signin">
            <img src={github} alt="" />
            Sign In with Github
          </button>
          <button onClick={handleFacebookSignIn} className="signin">
            <img src={facebook} alt="" />
            Sign In with Facebook
          </button>
        </>
      }
      <h2>Name: {user.displayName}</h2>
      <h3>Email: {user.email ? user.email : 'No email found'}</h3>
      {user.photoURL ? < img src={user.photoURL} alt = 'userPhoto' /> : ' '}
    </div>
  );
}

export default App;
