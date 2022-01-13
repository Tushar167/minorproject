import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./QHeader.css";
import firebase from "firebase";
import db from "../firebase";
import Channel from "./chat/Channel";
import Modal from "react-modal";
import QHeader from "./QHeader";
Modal.setAppElement("#root");
function Profile() {
  let { id } = useParams();
  console.log("this is id" + id);
  // const [user, setuser] = useState({});
  const [IsmodalOpen, setIsModalOpen] = useState(false);

  let sender = "";

  const user = firebase.auth().currentUser;

  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    sender = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToke
  }

  // useEffect(() => {
  //   db.collection("faculty")
  //     .where("email", "==", id)
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((element) => {
  //         var data = element.data();
  //         console.log(data);
  //         setuser(data);
  //       });
  //     });
  // }, []);

  return (
    <div>
      <QHeader />
      <div style={{ display: "flex", paddingLeft: "18%", paddingTop: "5%" }}>
        <img
          style={{
            border: "solid 2px #018e95",
            borderRadius: "50%",
            background: "white",
            height: "20%",
            width:"20%"
          }}
          src="https://firebasestorage.googleapis.com/v0/b/devathon-952a0.appspot.com/o/files%2FUser-Icon.png?alt=media&token=48bf497c-e24c-4e51-8a3e-e20b973b1ef4"
        />

        <div
          style={{ display: "flex", flexDirection: "column", paddingLeft:"5%", justifyContent:"space-around" }}
        >
          <h1
            className="App"
            style={{ alignSelf: "center", paddingLeft: "5%" }}
          >
            {id}
          </h1>
          <div style={{height:"25%", display:"flex", justifyContent: "space-around"}}>
            <button
             style={{ fontSize: "larger", backgroundColor: "#189AB4", border: "none",borderRadius: "13%",color: "black",fontWeight: "bold",width:"40%"}}
            >
              Faculty
            </button>
            <Link to={"/chat/" + sender + "/" + id} class="link" style={{display:"block", height:"100%", width:"40%", textAlign:"center", backgroundColor:"#189AB4"}}>
              <button
                class="cleardoubt"
                style={{height: "100%", width: "100%", fontSize: "larger", backgroundColor: "#189AB4", border: "none",borderRadius: "13%",color: "black",fontWeight: "bold"}}
                
              >
                Chat
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
