import React, { useEffect } from "react";
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';

import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./stateProvider";
import { auth, provider } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
function App() {
    const [{ user }, dispatch] = useStateValue();
    useEffect(() => {
        onAuthStateChanged(auth, (userAuth) => {
            dispatch({
                type: 'SET_USER',
                user: userAuth
            })
        })

    }, [])

    return (
        <>
            {!user ? <Login /> : (
                <div className="App">
                    <div className="app__body">
                        {/**Sidebar */}
                        <Sidebar />


                        <Routes>
                            <Route exact path="/" element={<Chat />} />
                            <Route path="/room/:roomid" element={<Chat />} />
                        </Routes>
                        {/**Body */}
                    </div>
                </div>
            )
            }
        </>
    );
}

export default App;
