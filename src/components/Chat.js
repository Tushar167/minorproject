import React, { useState, useEffect } from "react";
import {useParams, Link} from "react-router-dom"
import Feed from "./Feed.js";
import QHeader from "./QHeader";
import "./Discussly.css";
import Sidebar from "./sidebar/Sidebar.js";
import "./chat.css";
import Widget from "./widget/Widget.js";
import db from "../firebase"
import firebase from "firebase"
import { connect } from "react-redux";

function Chat() {
    const {id} = useParams()
    let sender = ""
    let reciever=""
 const [data, setdata] = useState([])
    const user = firebase.auth().currentUser;
      if (user !== null) {
        const displayName = user.displayName;
         sender = user.email;
        const photoURL = user.photoURL;
          const emailVerified = user.emailVerified;
    }
    
    useEffect(() => {
        
        db.collection("chatRoom").where("users", "array-contains", sender)
        .onSnapshot((snapshot) => {
            setdata(snapshot.docs.map((doc) => ({
                email: doc.data().users[0] == sender ? doc.data().users[1]:doc.data().users[0]
              })))
        })

       console.log(data)
    }, [])

   
  data.map(obj=>console.log(obj.email))
    // console.log(data)

  

  const generateID = (reciever) => {
   
      
  if (sender.split("@")[0] < reciever.split("@")[0]) {
   return sender.split("@")[0] + "-" + reciever.split("@")[0];
  } else {
   return reciever.split("@")[0] + "-" + sender.split("@")[0];
    }
    
    return id;
  }


  return (
<div className="discussly">
      <QHeader/>
      <div className="chat__content">
        <Sidebar />
        <div className="widget">
      <div className="widget__header">
        <h5>Chat {id}</h5>
        <h6></h6>
      </div>
          <div className="widget__contents">
            
            {data.map(obj => (<><Link to={"/chat/" + sender + "/" + obj.email}> <p></p>
            <div className="sidebarOption">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/devathon-952a0.appspot.com/o/files%2FUser-Icon.png?alt=media&token=48bf497c-e24c-4e51-8a3e-e20b973b1ef4"
          alt=""
        />

        <p>{obj.email}</p>
      </div>
            </Link></>)
              
            )}
      </div>
    </div>
        <div className="">
            
      </div>
        <Widget />
      </div>
    </div>
   
  );
}

export default Chat;
