import React, { useState } from "react";
import "./Login.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import db, { auth, provider } from "../../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [LorR, setLorR] = useState(false);
  const [role, setrole] = useState("student");
  const [dept, setdept] = useState("Computer Science");
  const [name, setname] = useState("")
  const signIn = () => {
    auth.signInWithPopup(provider).catch((e) => {
      alert(e.message);
    });
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
      })
      .catch((e) => alert(e.message));
  };

  const registerSignIn = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
     
           auth.user.updateProfile({
            displayName: name
          })
       
        if (auth) {
          // console.log(role);
          console.log(auth.user.displayName);
         
          const map = {
            
            
            email: email,
            photourl: auth.user.photoURL,
            department: dept
          };
          db.collection(role).add(map);
        }
      })
      .catch((e) => alert(e.message));
  };
  const logincomponent = (
    <div className="login__emailPass">
      <div className="login__inputFields">
        <div className="login__inputField">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
        </div>
        <div className="login__inputField">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </div>
      </div>
      <div className="login__forgButt">
        <small>Forgot Password?</small>
        <button onClick={handleSignIn}>Login</button>
      </div>
    </div>
  );

  const registercomponent = (
    <div className="login__emailPass">
      <div className="login__inputFields">
      <div className="login__inputField">
          <input
            value={name}
            onChange={(e) => setname(e.target.value)}
            type="text"
            placeholder="Name"
          />
        </div>
        <div className="login__inputField">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
        </div>
        <div className="login__inputField">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="login__inputField">
          <select
            value={role}
            onChange={(e) => {
              setrole(e.target.value);
            }}
          >
            <option disabled selected>
              role
            </option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>
        <div className="login__inputField">
        <select
            value={dept}
            onChange={(e) => {
              setdept(e.target.value);
            }}
          >
            <option disabled selected>
              department
            </option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electronics and computers">Electronics and computers</option>
            <option value="Electronics and communications">Electronics and communications</option>
          </select>
        </div>
      </div>

      <button onClick={registerSignIn}>Register</button>
    </div>
  );
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__logo">
          <img src="logo.png" alt="" />
        </div>
        <div className="login__desc">
          <p>A Place for students and professors</p>
          {/* <p style={{ color: "royalblue", fontSize: "25px" }}>
            HandCrafted with ❤️ by{" "}
          </p> */}
        </div>
        <div className="login__auth">
          <div className="login__label">
            <button style={LorR?{}:{background:"#189AB4",color:"white"}}
              onClick={() => {
                setLorR(false);
              }}
            >
              Login
            </button>
            <button style={LorR ? { background: "#189AB4", color:"white" }: {} }
              onClick={() => {
                setLorR(true);
              }}
            >
              Register
            </button>
          </div>
          {LorR ? registercomponent : logincomponent}
        </div>
      </div>
    </div>
  );
}

export default Login;
