import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import "./App.css";
import Pusher from "pusher-js"
import axios from "./axios.js"

const App = () => {

  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios.get('/messages/sync').then(response =>{
      console.log(response.data)
      setMessages(response.data)
    })
  }, [])
  

  useEffect(() => {
    const pusher = new Pusher("f765239b13509026615a", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages ,newMessage]);
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe()
    }

  }, [messages]);

  console.log(messages);
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat  messages={messages}/>
      </div>
    </div>
  );
};

export default App;
