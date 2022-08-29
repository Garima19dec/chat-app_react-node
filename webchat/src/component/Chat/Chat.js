import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
 import socketIo from "socket.io-client";
import "./Chat.css";
 import sendLogo from "../../images/send.png";
 import Message from "../Message/Message";
 import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";
import { Editor } from "@tinymce/tinymce-react";
 import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

 let socket;

const ENDPOINT = "http://localhost:4500/";
 

const Chat = () => {

     socket = socketIo(ENDPOINT, { transports: ["websocket"] });
  
   const [id, setid] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
   

  const send = () => {
     
    
     const message = document.getElementById("chatInput").value;
     socket.emit("message", { message, id });
     document.getElementById("chatInput").value = "";
   };

   console.log(messages);
   useEffect(() => {
    

     socket.on("connect", () => {
       alert("Connected");
       setid(socket.id);
    });
       console.log(socket);
       
     socket.emit("joined", { user });    // emit means to send data

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    return () => {
       socket.emit("disconnection");
       socket.off();
     };
   }, []);

   useEffect(() => {
     socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
       console.log(data.user, data.message, data.id);
     });
    return () => {
       socket.off();
     };
   }, [messages]);

    return (
      //  <h1>{user}</h1>
      <div className="chatPage">
        <div className="chatContainer">
          <div className="header">
            <h2>WEB CHAT Welcomes to {user}</h2>
            <a href="/">
              {" "}
              <img src={closeIcon} alt="Close" />
            </a>
          </div>
          <ReactScrollToBottom className="chatBox">
            {/* <Message message={"hye whatsup..!"} />
            <Message message={"hye whatsup..!"} />
            <Message message={"hye whatsup..!"} /> */}
            {messages.map((item, i) => (
              <Message
                user={item.id === id ? "" : item.user}
                message={item.message}
                //classs={'left'}
                classs={item.id === id ? "right" : "left"}
              />
            ))}
          </ReactScrollToBottom>
          {/* <div className="App">
            <div className="editor">
              <CKEditor
                editor={ClassicEditor}
                data={text}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setText(data);
                }}
              />
            </div>
          </div> */}
          <div className="inputBox">
            <input
              placeholder="Enter your text ..."
              onKeyPress={(event) => (event.key === "Enter" ? send() : null)}
              type="text"
              id="chatInput"
            />
            <button onClick={send} className="sendBtn">
              <img src={sendLogo} alt="Send" />
            </button>
          </div>
        </div>
      </div>
    );
};

export default Chat;
