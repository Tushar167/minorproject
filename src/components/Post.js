import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Post.css";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import RepeatOutlinedIcon from "@material-ui/icons/RepeatOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import { MoreHorizOutlined, ShareOutlined, Update } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import Modal from "react-modal";
import db from "../firebase";
import { selectQuestionId, setQuestionInfo } from "../features/questionSlice";
import firebase from "firebase";
import { Link } from "react-router-dom"
function Post({ Id, question, imageUrl, timestamp, users, file, upvote, field}) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
// console.log(file)
  const [IsmodalOpen, setIsModalOpen] = useState(false);
  const questionId = useSelector(selectQuestionId);
  const [answer, setAnswer] = useState("");
  const [getAnswers, setGetAnswers] = useState([]);
  useEffect(() => {
    if (questionId) {
      db.collection(field)
        .doc(questionId)
        .collection("answer")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setGetAnswers(
            snapshot.docs.map((doc) => ({ id: doc.id, answers: doc.data() }))
          )
      );
      
    }
  }, [questionId]);


  const handleupvote = (e) => {
    e.preventDefault();
    if (questionId) {
      db.collection(field).doc(questionId).update({
        upvote: firebase.firestore.FieldValue.arrayUnion(user)
      }
      )
    }

    // db.collection("questions").doc(questionId).collection("upvote").doc(user).delete({
    //   user: user,
    //   upvote: true,
    //   questionId: questionId,
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    // });

    // console.log(questionId);
    // setAnswer("");
    // setIsModalOpen(false);
  };

  const handleAnswer = (e) => {
    e.preventDefault();
    
    if (questionId) {
      db.collection(field).doc(questionId).collection("answer").add({
        user: user,
        answer: answer,
        questionId: questionId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    console.log(questionId);
    setAnswer("");
    setIsModalOpen(false);
  };
  return (
    <div
      className="post"
      onClick={() =>
        dispatch(
          setQuestionInfo({
            questionId: Id,
            questionName: question,
          })
        )
      }
    >
      <div className="post__info">
        <Avatar
          src={
            users.photo
              ? users.photo
              : "https://dp-client.com/CMS-NEW/assets/images/user/user11605616227.png"
          }
        />
        {users.email=="Anonymous"?<h4 style={{paddingLeft:""}}>Anonymous</h4>:<Link to={`profile/student/`+users.email}><h4 style={{paddingLeft:"15%"}}>{users.displayName ? users.displayName : users.email.split("@")[0]}</h4></Link>}
        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
      </div>
      <div className="post__body">
        <div className="post__question">
          <h3>{question}</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="post__btnAnswer"
          >
            Answer
          </button>
          <Modal
            isOpen={IsmodalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            shouldCloseOnOverlayClick={false}
            style={{
              overlay: {
                width: 680,
                height: 550,
                backgroundColor: "rgba(0,0,0,0.8)",
                zIndex: "1000",
                top: "50%",
                left: "50%",
                marginTop: "-250px",
                marginLeft: "-350px",
              },
            }}
          >
            <div className="modal__question">
              <h1>{question}</h1>
              <p>
              {field=="questions"? "asked by":"Proposed By"}{" "}
                <span className="name">
                  {users.displayName ? users.displayName :users.email}
                </span>{" "}
                {""}
                on{" "}
                <span className="name">
                  {new Date(timestamp?.toDate()).toLocaleString()}
                </span>
              </p>
            </div>
            <div className="modal__answer">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter Your Answer"
                type="text"
              />
            </div>
            <div className="modal__button">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button type="sumbit" onClick={handleAnswer} className="add">
                Add Answer
              </button>
            </div>
          </Modal>
        </div>
        
       {file && <a target="_blank" href={file} ><button className="fileButton">{ field=="questions"? "File":"Project File"}</button></a>}
        <div className="post__answer">
          {getAnswers.map(({ id, answers }) => (
            <p key={id} style={{ position: "relative", paddingBottom: "5px" , border:"black"}}>
              {Id === answers.questionId ? (
                <span>
                  {answers.answer}
                  <br />
                  <span
                    style={{
                      position: "absolute",
                      color: "gray",
                      fontSize: "small",
                      display: "flex",
                      right: "0px",
                    }}
                  >
                    <span style={{ color: "#b92b27" }}>
                      {answers.user.displayName
                        ? answers.user.displayName
                        : answers.user.name}{" "}
                      on{" "}
                      {new Date(answers.timestamp?.toDate()).toLocaleString()}
                    </span>
                  </span>
                </span>
              ) : (
                ""
              )}
            </p>
          ))}
        </div>
        <img src={imageUrl} alt="" />
      </div>
      <div className="post__footer">
        <div className="post__footerAction">
          <ArrowUpwardOutlinedIcon onClick={(e)=>handleupvote(e)} />{upvote==undefined? 0: upvote.length}
        </div>

        {/* <RepeatOutlinedIcon />
        <ChatBubbleOutlineOutlinedIcon /> */}
        <div className="post__footerLeft">
          <ShareOutlined />
          <MoreHorizOutlined />
        </div>
      </div>
    </div>
  );
}

export default Post;
