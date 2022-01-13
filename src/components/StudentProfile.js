import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom"
import db from "../firebase";
import QHeader from "./QHeader";

import firebase from "firebase";
import Post from "./Post";
function Profile() {
    let { id } = useParams()
    const [posts, setPosts] = useState([])
    useEffect(() => {
            
        db.collection("questions").where('email', "==", id).onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            questions: doc.data(),
          }))
        )
      )
 }, [])
    
 let sender = "";

 const user = firebase.auth().currentUser;

 if (user !== null) {
   // The user object has basic properties such as display name, email, etc.
   const displayName = user.displayName;
   sender = user.email;
   const photoURL = user.photoURL;
   const emailVerified = user.emailVerified;

 }
    
    
    return (
        <div>
            <QHeader />
            
            <div style={{ display: "flex", paddingLeft:"18%", paddingTop:"5%" }}>
                <img
                    style={{ border: "solid 2px aqua", borderRadius: "50%", background:"white"}}
                    src="https://dp-client.com/CMS-NEW/assets/images/user/user11605616227.png" />
                <div style={{ display: "flex", flexDirection: "column", paddingLeft:"5%", justifyContent:"space-around" }}>
                    <h1 className="App" style={{ alignSelf: "center", paddingLeft: "5%" }}>{id}</h1>
                    <div style={{height:"25%", display:"flex", justifyContent: "space-around"}}>
                    <button class="mdc-button" style={{ fontSize: "larger", backgroundColor: "#189AB4", border: "none",borderRadius: "13%",color: "black",fontWeight: "bold",width:"40%"}}>Student</button>
                   <Link class="mdc-button mdc-button--raised" to={"/chat/"+sender+"/"+id} style={{display:"block", height:"100%", width:"40%", textAlign:"center", backgroundColor:"#189AB4"}}> <button style={{height: "100%", width: "100%", fontSize: "larger", backgroundColor: "#189AB4", border: "none",borderRadius: "13%",color: "black",fontWeight: "bold"}}>Chat</button></Link>
                   </div>
                </div>
                
               
            </div >
        <div style={{marginLeft:"20%", marginRight:"20%"}}>
            {posts.map(({ id, questions}) => (
        <Post
          key={id}
          Id={id}
          question={questions.question}
          imageUrl={questions.imageUrl}
          timestamp={questions.timestamp}
          users={questions.user}
          file={questions.file == undefined ? "" : questions.file}
          upvote={questions.upvote}
          field={"questions"}
        />
            ))}
        </div>
            
        </div>
    );
    
}
export default Profile
