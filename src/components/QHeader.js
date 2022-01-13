import React, { useState } from "react";
import ChatIcon from "@material-ui/icons/Chat";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import SearchIcon from "@material-ui/icons/Search";
import LanguageIcon from "@material-ui/icons/Language";
import Modal from "react-modal";
import {Link} from "react-router-dom"
import "./QHeader.css";
import { Avatar, Button, Input } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db, { auth, storage } from "../firebase";
import { ExpandMore } from "@material-ui/icons";
import firebase from "firebase";

Modal.setAppElement("#root");

function QHeader({field}) {
  const user = useSelector(selectUser);
  const allInputs = {imgUrl: ''}
  // const [imageAsFile, setImageAsFile] = useState("");
  // const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [Privacy, setPrivacy] = useState("email")
  const [IsmodalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("")
  // const [fileHolder, setfileHolder] = useState("");
  const [uploading, setuploading] = useState(false)
  const questionName = input;
  const Anonymous = {
    email: "Anonymous",
    photo: "",
    disPlayName: "",
}
  const handleQuestion = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    if (questionName) {
      db.collection(field).add({
        user: Privacy == "email" ? user:Anonymous,
        email: Privacy == "email" ? user.email: "Anonymous",
        question: input,
        imageUrl: inputUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      //  file: storage.ref(`/files/${fileHolder.name}`).put(fileHolder)
        file: url,
        upvote:[]
      });
    }
  };


console.log(Privacy)
  async function handleFireBaseUpload(e) {
  setuploading(true)
  e.preventDefault();
  let file = e.target.files[0]
  console.log(file.name)
  const ref = storage.ref(`/files/${file.name}`);
  const uploadTask = ref.put(file);
  uploadTask.on("state_changed", console.log, console.error, () => {
    ref
      .getDownloadURL()
      .then((url) => {
        setFile(null);
        setURL(url);
        setuploading(false)
      });
  });
}
  


  

  return (
    <div className="qHeader">
      <div>
        <Link to="/">
          <div className="qHeader__logo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/devathon-952a0.appspot.com/o/files%2Flogo.png?alt=media&token=35db4ac8-6e7e-4198-99e7-51dda808dc8c"
              alt=""/>
          </div>
        </Link>
      </div>

      <div className="qHeader__input">
        <SearchIcon />
        <input type="text" placeholder="Search Discussly" />
      </div>

      <div className="qHeader__Rem">
      <Link to={"/chat/"+user.email}>
        <div className="qHeader__icons">
          <ChatIcon />
        </div>
      </Link>
        <div className="qHeader__avatar">
          <Avatar
            onClick={() => auth.signOut()}
            className="Avatar"
            src={
              user.photo
                ? user.photo
                : "https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573"
            }
          />
        </div>

        <Button onClick={() => setIsModalOpen(true)}>{field=="questions" ? "Ask Question": "Add Project"}</Button>
        <Modal
          isOpen={IsmodalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          shouldCloseOnOverlayClick={false}
          style={{
            overlay: {
              width: 700,
              height: 600,
              backgroundColor: "rgba(0,0,0,0.8)",
              zIndex: "1000",
              top: "50%",
              left: "50%",
              marginTop: "-300px",
              marginLeft: "-350px",
            },
          }}
        >
          
          <div className="modal__info">
            <Avatar
              className="avatar"
              src={
                user.photo
                  ? user.photo
                  : "https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573"
              }
            />
            <p>{user.disPlayName ? user.disPlayName : user.email} asked</p>
            <div className="modal__scope">
              <PeopleAltOutlinedIcon />
              
              <select
            value={Privacy}
            onChange={(e) => {
              setPrivacy(e.target.value);
            }}
          >
                <option value="email">{ user.email}</option>
            <option value="Anonymous">Anonymous</option>
          </select>
            
            </div>
          </div>
          <div className="modal__Field">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Ask your Question here"
            />
            <div className="modal__fieldLink">
              <Link />
              <input
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                type="text"
                placeholder="Optional: inclue a link that gives context"
              ></input>
            </div>
            <div className="modal__fieldLink">
              <p style={{color:"red"}}>{uploading? "Your file is uploading...": "" }</p>
            </div>
            <div className="modal__fieldLink">
              <Link />
              <input type="file" onChange={
                handleFireBaseUpload
              }></input>
            </div>
            
          </div>
          <div className="modal__buttons">
            <button className="cancle" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="sumbit" onClick={(e) => (handleQuestion(e)) } className="add" >
              {field=="questions" ? "Add Question": "Add a Project"}
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default QHeader;
