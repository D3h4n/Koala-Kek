import React, { useEffect, useState, useCallback } from "react";
import { User, TL_Post } from "../../defintions";

import axios from "axios";
import { useHistory } from "react-router-dom";
import Post from "../main/timeline/Post";

interface Props {
  user: User;
}

export default function Profile({ user }: Props) {
  let [posts, setPosts] = useState<TL_Post[]>([]);
  let history = useHistory();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/posts/`, {
        params: {
          userID: user._id,
          count: 10,
        },
      })
      .then((res) => JSON.parse(res.data))
      .then((res: TL_Post[]) => setPosts(res))
      .catch((err) => console.log(err));
  }, [user]);

  const getUser = useCallback(
    (id) =>
      new Promise<User>((resolve, reject) =>
        user ? resolve(user) : reject("No user found")
      ),
    [user]
  );

  return (
    <div className="profile">
      <h1>Profile View</h1>
      <div className="sidebar-user">
        <img className="sidebar-user-img" src={user.icon} alt="profile pic" />
        <h3 className="sidebar-user-display-name">{user.displayName}</h3>
      </div>
      {posts.map((post, idx) => (
        <div className="profile-post">
          <Post key={idx} post={post} getUser={getUser} />
          <button className="profile-post-del-button">X</button>
        </div>
      ))}
      <button onClick={() => history.goBack()}>Back</button>
    </div>
  );
}
