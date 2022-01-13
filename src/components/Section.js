import React from "react";
import Feed from "./Feed.js";
import QHeader from "./QHeader";
import "./Discussly.css";
import "./auth/Login.css"
import Sidebar from "./sidebar/Sidebar";
import Widget from "./widget/Widget.js";
import Section from "./Section.js";

function Quora({setfield,field}) {
  return (
    <div style={{    display: "block",
    alignSelf: "center",
      margintop: "50px"}}>
    <div class="login__label" style={{justifyContent:"center", marginTop:"50px"}}>
        <button style={field=="projects"?{backgroundColor:"#189AB4", color:"white"}:{}} onClick={()=>setfield("projects")}>Projects</button>
          <button style={field=="questions"?{backgroundColor:"#189AB4", color:"white"}:{}} onClick={()=>setfield("questions")}>Questions</button>
      </div>
      </div>
  );
}

export default Quora;
