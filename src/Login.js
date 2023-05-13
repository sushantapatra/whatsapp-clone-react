import React from 'react'
import './css/login.css'
import { auth, provider } from './firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useStateValue } from "./stateProvider";

const Login = () => {
    const [{ }, dispatch] = useStateValue();
    const signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log(user);
                dispatch({
                    type: 'SET_USER',
                    user: user
                }).catch(err => alert(err))

            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log({ errorCode, errorMessage, credential });
            });
    }
    return (
        <div className='login__wrapper'>
            <div className="login">
                <img src="https://cdn-icons-png.flaticon.com/128/5968/5968841.png" alt="" />
                <h2>Sign in to WhatsApp</h2>
                <button onClick={signIn}>Login with Gmail</button>
            </div>
        </div>
    )
}

export default Login