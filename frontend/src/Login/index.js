import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { useLocalState } from '../util/useLocalStorage';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [jwt, setJwt] = useLocalState("", "jwt");
    function sendLoginRequest () {
        const reqBody = {
          username: username,
          password: password,
        }
        fetch('api/auth/login', {
          "headers": {
            "Content-Type": "application/json"
          },
          "method": "post",
          "body": JSON.stringify(reqBody)
        })
        .then((response) => {
            if(response.status === 200) 
                return Promise.all([response.json(), response.headers]);
            else
                return Promise.reject("Invalid login attempt");
        })
        .then(([body, headers]) => {
          setJwt(headers.get("authorization"));
          window.location.href = "/";
        }).catch((message) => {
            alert(message);
        });
    }
    return (
        <div>
        <div>
            <label htmlFor='username'>username</label>
            <input type="email" id="username" value={username} onChange={(event) => setUsername(event.target.value)}></input>
        </div>

        <div>
            <label htmlFor='password'>password</label>
            <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
        </div>
        <div>
            <button id="submit" type="button" onClick={() => sendLoginRequest()}>Login</button>
        </div>
        </div>
    );
};

export default Login;