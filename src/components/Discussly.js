import React, { useState } from "react";
import Feed from "./Feed.js";
import QHeader from "./QHeader";
import "./Discussly.css";
import Sidebar from "./sidebar/Sidebar";
import Widget from "./widget/Widget.js";
import Section from "./Section.js";
import ProjectFeed from "./ProjectFeed.js";

function Discussly() {
  const [field, setfield] = useState("questions")
  return (
    <div className="discussly">
      <QHeader field={ field} />
      <Section field={field} setfield={setfield}/>
      <div className="discussly__content">
        <Sidebar />
        {field=="questions" ? <Feed />:<ProjectFeed/>}
        <Widget />
      </div>
    </div>
  );
}

export default Discussly;
