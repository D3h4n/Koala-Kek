import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { handleChange } from "../App";
import { SignUpData } from "../../defintions";

const md5 = require("md5");

interface Props {
  returnUserID: (userID: string) => void;
}

export default function SignUp({ returnUserID }: Props) {
  const [formData, setData] = useState<SignUpData>({
    userName: "",
    passWord: "",
    displayName: "",
  });
  const [exists, setExists] = useState<boolean>(false);
  const textLimit = 50;
  const displayNameTextLimit = 20;

  let history = useHistory();

  function checkUsername(userName: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      axios
        .get(`${process.env.REACT_APP_API_URI}/username/`, {
          params: {
            userName,
          },
        })
        .then((res) => JSON.parse(res.data))
        .then((res: boolean) => resolve(res))
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (formData.userName && formData.passWord && formData.displayName) {
      let submit: SignUpData = {
        userName: md5(formData.userName),
        passWord: md5(formData.passWord),
        displayName: formData.displayName,
      };

      checkUsername(submit.userName)
        .then((res) => {
          if (!res) {
            axios
              .put(`${process.env.REACT_APP_API_URI}/sign-up/`, { ...submit })
              .then((res) => JSON.parse(res.data))
              .then((res: string) => {
                returnUserID(res);
                history.push("/main");
              })
              .catch((err) => console.error(err));
          } else {
            setExists(true);
          }
        })
        .catch((err) => console.error(err));
    }
  }

  return (
    <div className="sign-up">
      <h1 className="sign-up-header">Sign Up</h1>
      <div style={{ color: "red" }}>
        {exists ? "That username is already in use" : ""}
      </div>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <label>
          Display Name:
          <br />
          <input
            type="text"
            className="sign-up-form-input"
            name="displayName"
            value={formData.displayName}
            maxLength={displayNameTextLimit}
            onChange={(event) => handleChange(event, setData, formData)}
            placeholder="Display Name"
          />
        </label>
        <label>
          <br />
          Username:
          <br />
          <input
            type="text"
            className="sign-up-form-input"
            name="userName"
            value={formData.userName}
            maxLength={textLimit}
            onChange={(event) => handleChange(event, setData, formData)}
            placeholder="Username"
          />
        </label>
        <label>
          <br />
          Password:
          <br />
          <input
            type="password"
            className="sign-up-form-input"
            name="passWord"
            value={formData.passWord}
            maxLength={textLimit}
            onChange={(event) => handleChange(event, setData, formData)}
            placeholder="Password"
          />
        </label>
        <div className="sign-up-form-btns">
          <button className="sign-up-form-btn" onClick={() => history.goBack()}>
            Back
          </button>
          <button className="sign-up-form-btn">Sign Up</button>
        </div>
      </form>
    </div>
  );
}
