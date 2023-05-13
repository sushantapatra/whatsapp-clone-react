import React, { useEffect, useState } from 'react'
import './css/sidebar.css'
import Avatar from '@mui/material/Avatar';
import { db } from './firebase';
import { collection, getDocs, addDoc, orderBy } from 'firebase/firestore'
const SidebarChat = ({ addnewchat, id, name }) => {
    const [seed, setSeed] = useState("")
    const [lastMessage, setLastMessage] = useState([])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
        getMessageData(id)
    }, [])

    const createChat = () => {
        const room = prompt("Please Enter room Name.");
        if (room) {
            addDoc(collection(db, 'rooms'), {
                name: room,
            }).catch(err => console.error(err))
        }
    }
    //read message
    const getMessageData = async (id) => {
        const subColRef = collection(db, "rooms", id, "message");
        try {
            const docSnap = await getDocs(subColRef, orderBy('created', 'desc'));
            setLastMessage(docSnap.docs.map(doc => doc.data()))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {!addnewchat ? <div className='sidebar__chat'>
                <Avatar alt="Sushanta" src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="side__chatInfo">
                    <h2>{name}</h2>
                    <p>{lastMessage[0]?.message}</p>
                </div>
            </div> :
                <div className='sidebar__chat' onClick={createChat}>
                    <h2>Add New Chat</h2>
                </div>
            }

        </>
    )
}

export default SidebarChat