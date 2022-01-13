import React from 'react';

import { formatRelative } from 'date-fns';

const formatDate = date => {
  let formattedDate = '';
  if (date) {
    // Convert the date in words relative to the current date
    formattedDate = formatRelative(date, new Date());
    // Uppercase the first letter
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};

const Message = ({
    createdAt = null,
    text = '',
    displayName = '',
      photoURL = '',
      sender = '',
    realsender
  }) => {
   
  if (!text) return null;
console.log(sender, localStorage.getItem("sender"))
  return (
    <div style={{border:"1px solid aqua"}}>
      {photoURL ? (
        <img
          src={photoURL}
          alt="Avatar"
          className="rounded-full mr-4"
          width={45}
          height={45}
        />
      ) : null}
      <div style=  {{  display: "flex",
    flexDirection: "column",
    /* align-content: flex-end; */
              alignItems: sender==localStorage.getItem("sender") ? "end":""
          }}>
        <div className="flex items-center mb-1">
          {sender ? (
            <p className="mr-2 text-primary-500" >{sender}</p>
          ) : null}

        </div>
              <p style={{ display: "flex", position: "relative", right: "0" }}>{text}</p>
              {createdAt?.seconds ? (
            <span className="text-gray-500 text-xs" style={{fontSize:"smaller"}}>
              {formatDate(new Date(createdAt.seconds * 1000))}
            </span>
          ) : null}
      </div>
    </div>
  );
};



export default Message;