import React, { useEffect, useState } from 'react'
import './css/chat.css'
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom';
import { doc, getDoc, getDocs, setDoc, addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from './firebase';
import { useStateValue } from "./stateProvider";
const Chat = () => {
    const { roomid } = useParams()
    const [roomName, setRoomName] = useState("")
    const [message, setMessage] = useState([])
    const [input, setInput] = useState("")
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomid) {
            getRoomData(roomid)
            getMessageData(roomid)
        }

    }, [][roomid])

    //send message
    const sendMessage = (e) => {
        e.preventDefault()
        if (input === "") {
            return alert('Please enter your message.')
        }
        const docRef = doc(db, "rooms", roomid);

        const colRef = collection(docRef, "message")
        addDoc(colRef, {
            name: user.displayName,
            message: input,
            created: Timestamp.now()
        });
        setInput('')
    }

    //read room name
    const getRoomData = async (id) => {
        const docRef = doc(db, "rooms", id);
        try {
            const docSnap = await getDoc(docRef);
            setRoomName(docSnap.data().name)
        } catch (error) {
            console.log(error)
        }
    }

    //read message
    const getMessageData = async (id) => {
        const subColRef = collection(db, "rooms", id, "message");
        try {
            const docSnap = await getDocs(subColRef);
            setMessage(docSnap.docs.map(doc => doc.data()))
        } catch (error) {
            console.log(error)
        }
    }
    const lastSeen = new Date(message[message.length - 1]?.created?.seconds * 1000).toLocaleTimeString();
    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        {

                            lastSeen
                        }
                    </p>
                </div>
                <div className="header__right">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {
                    message.map((data, index) => {
                        const createDate = new Date(data.created?.seconds * 1000).toLocaleTimeString();
                        return (<p className={`chat__message ${user.displayName == data.name && "chat__reciever"}`} key={index}>
                            <span className='chat__name'>{data.name}</span>
                            {data.message}
                            <span className='chat__time'>{createDate}</span>
                        </p>)
                    })

                }

            </div>

            <div className="chat__footer">
                <EmojiEmotionsIcon />
                <AttachFileIcon />
                <form onSubmit={sendMessage}>
                    <input type="text" placeholder='Type your message' value={input} onChange={e => setInput(e.target.value)} />
                    <input type="submit" />
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat