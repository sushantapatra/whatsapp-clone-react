import React, { useEffect, useState } from 'react'
import './css/sidebar.css'
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat';

import { db } from './firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'
import { Link } from 'react-router-dom';

import { signOut } from "firebase/auth";
import { auth, provider } from './firebase';
import { useStateValue } from "./stateProvider";
const Sidebar = () => {
    const [rooms, setRooms] = useState([])
    const [{ user }, dispatch] = useStateValue();
    useEffect(() => {
        const q = query(collection(db, 'rooms'),)
        onSnapshot(q, (querySnapshot) => {
            setRooms(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })


    }, [])

    const logoutUser = () => {
        signOut(auth);
        dispatch({
            user: null
        })
    }
    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <Avatar alt="Sushanta" src={user.photoURL} onClick={logoutUser} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchIcon />
                    <input type="text" placeholder='Search or Start a new Chat' />
                </div>
            </div>
            <div className="sidebar__Chats">

                <SidebarChat addnewchat />
                {
                    rooms.map(room => {
                        return <Link to={`room/${room.id}`} key={room.id}><SidebarChat id={room.id} name={room.data.name} /></Link>
                    })
                }
            </div>
        </div>
    )
}

export default Sidebar