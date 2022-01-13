import React, {useEffect, useState} from "react";
import "./Widget.css";
import WidgetContent from "./WidgetContent";
import db from "../../firebase";
function Widget() {
const [faculty, setfaculty] = useState([])
  // useEffect(() => {
  //   db.collection("faculty")
  //     .onSnapshot((snapshot) =>
  //       console.log(snapshot.doc.data())
  //       // setPosts(
  //       //   snapshot.map((doc) => ({
  //       //     id: doc.id,
  //       //     questions: doc.data(),
  //       //   }))
  //       // )
  //     );
  // }, []);

  useEffect(() => {
    db.collection("faculty")
      .onSnapshot((snapshot) =>{
          setfaculty(snapshot.docs.map((doc) => ({
            id: doc.id,
            email: doc.data().email,
            photourl: doc.data().photourl == null? "": doc.data().photourl,
          })))
        }
       
      );
  }, []);
  return (
    <div className="widget">
      <div className="widget__header">
        <h5>Faculty</h5>
      </div>
      <div className="widget__contents">
        {/* <WidgetContent /> */}
        {faculty.map(i => (
          <WidgetContent user={i} />
        )
        )}
      </div>
    </div>
  );
}

export default Widget;
