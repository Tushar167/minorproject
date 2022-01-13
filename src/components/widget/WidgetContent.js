import React from "react";
import "./WidgetContent.css";
import { Link } from "react-router-dom"
function WidgetContent({ user }) {
  
  return (
    <div className="widget__contents">
      <div className="widget__content">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/devathon-952a0.appspot.com/o/files%2FUser-Icon.png?alt=media&token=48bf497c-e24c-4e51-8a3e-e20b973b1ef4"
          alt=""
        />
        <div className="widget__contentTitle">
          <Link to={`profile/`+user.email}><h5>{ user.email}</h5></Link>
          <p>{ }</p>
        </div>
      </div>
    </div>
  );
}

export default WidgetContent;
